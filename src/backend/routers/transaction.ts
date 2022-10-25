import { CurrencyType } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "../utils/router";

export const transactionRouter = createRouter()
  .mutation("create", {
    input: z.object({
      amount: z.number().positive(),
      accountId: z.string(),
      description: z.string().nullable(),
      toIban: z.string().min(26).max(26),
      name: z.string().min(1).max(255),
    }),
    async resolve({ ctx, input }) {
      const user = ctx.user;
      const account = await ctx.prisma.bankAccount.findFirst({
        where: {
          id: input.accountId,
          userId: user!.id,
        },
      });

      if (!account) {
        throw new Error("Gönderen hesap bulunamadı!");
      }

      const toAccount = await ctx.prisma.bankAccount.findFirst({
        where: {
          iban: input.toIban,
        },
      });

      if (!toAccount) {
        throw new Error("Gönderilecek hesap bulunamadı!");
      }

      var amount = input.amount;

      if (account.currency !== CurrencyType.TRY) {
        const currencyType = await ctx.prisma.money.findFirst({
          where: {
            currencyType: account.currency,
          },
        });
        amount *= parseFloat(currencyType!.amount.toString());
      }

      if (toAccount.currency !== CurrencyType.TRY) {
        const currencyType = await ctx.prisma.money.findFirst({
          where: {
            currencyType: toAccount.currency,
          },
        });
        amount /= parseFloat(currencyType!.amount.toString());
      }

      const transaction = await ctx.prisma.transfer.create({
        data: {
          amount: input.amount,
          from: {
            connect: {
              id: account.id,
            },
          },
          to: {
            connect: {
              id: toAccount.id,
            },
          },
          currency: account.currency,
          convertedAmount: amount,
          toCurrency: toAccount.currency,
          toName: input.name,
          fromName: user!.name,
          description: input.description ?? user!.name + " tarafından gönderildi.",
          fromAfterBalance: account.balance.minus(input.amount),
          toAfterBalance: toAccount.balance.plus(amount),
        },
      });

      await ctx.prisma.bankAccount.update({
        where: {
          id: toAccount.id,
        },
        data: {
          balance: toAccount.balance.plus(amount),
        },
      });

      await ctx.prisma.bankAccount.update({
        where: {
          id: account.id,
        },
        data: {
          balance: account.balance.minus(input.amount),
        },
      });

      return {
        message:
          input.toIban === "TR000000000000000000000000"
            ? "Fatura ödeme işlemi başarılı!"
            : "Para gönderme işlemi başarılı!",
        transaction,
      };
    },
  })
  .query("list", {
    input: z.object({
      accountId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = ctx.user;
      const transactions = await ctx.prisma.transfer.findMany({
        where: {
          OR: [
            {
              fromId: input.accountId,
            },
            {
              toId: input.accountId,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          from: true,
          to: true,
        },
      });

      return { transactions };
    },
  });
