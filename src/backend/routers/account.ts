import { BankAccountType, CurrencyType } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "../utils/router";

export const accountRouter = createRouter()
  .query("list", {
    /* input: z.object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish(),
  }), */
    async resolve({ ctx, input }) {
      /* const limit: number = input?.limit ?? 10; */
      /* const cursor: string | undefined | null = input?.cursor; */
      const user = ctx.user;
      const accounts = await ctx.prisma.bankAccount.findMany({
        /* take: limit + 1, */
        where: {
          userId: user!.id,
        },
        /* cursor: cursor ? { id: cursor } : undefined, */
        orderBy: {
          deletedAt: "asc",
        },
      });

      /* let nextCursor: typeof cursor | null = null;

    if (items.length > limit) {
      const nextItem = items.pop();
      nextCursor = nextItem!.id;
    } */

      return { accounts };
    },
  })
  .mutation("create", {
    input: z.object({
      currency: z
        .string()
        .refine((v) => [CurrencyType.EUR, CurrencyType.TRY, CurrencyType.USD].includes(v.toUpperCase() as any)),
      type: z
        .string()
        .refine((v) => [BankAccountType.CURRENT, BankAccountType.SAVINGS].includes(v.toUpperCase() as any)),
    }),
    async resolve({ ctx, input }) {
      const user = ctx.user;
      var iban = "TR";

      var ibanExists = true;

      while (ibanExists) {
        iban = "TR";
        for (var i = 0; i < 24; i++) {
          iban += Math.floor(Math.random() * 10);
        }
        const ibanQuery = await ctx.prisma.bankAccount.findFirst({
          where: {
            iban,
          },
        });

        ibanExists = ibanQuery !== null;
      }

      const account = await ctx.prisma.bankAccount.create({
        data: {
          iban: iban,
          balance: 0,
          currency: input.currency.toUpperCase() as CurrencyType,
          type: input.type.toUpperCase() as BankAccountType,
          userId: user!.id,
        },
      });

      return { message: "Yeni hesap başarıyla oluşturuldu!", account };
    },
  });
