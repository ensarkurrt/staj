import { CurrencyType } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "../utils/router";

export const transactionRouter = createRouter().mutation("create", {
  input: z.object({
    amount: z.number().positive(),
    accountId: z.string(),
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
      throw new Error("Account not found");
    }

    const toAccount = await ctx.prisma.bankAccount.findFirst({
      where: {
        iban: input.toIban,
      },
    });

    if (!toAccount) {
      throw new Error("To account not found");
    }

    var amount = input.amount;

    if (account.currency !== CurrencyType.TRY) {
      const currencyType = await ctx.prisma.money.findFirst({
        where: {
          currencyType: account.currency,
        },
      });
      amount *= currencyType!.amount;
    }

    if (toAccount.currency !== CurrencyType.TRY) {
      const currencyType = await ctx.prisma.money.findFirst({
        where: {
          currencyType: toAccount.currency,
        },
      });
      amount /= currencyType!.amount;
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
        toName: input.name,
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

    return { message: "Para gönderme işlemi başarılı!", transaction };
  },
});
