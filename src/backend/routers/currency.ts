import { createRouter } from "../utils/router";

export const currencyRouter = createRouter().query("list", {
  async resolve({ ctx }) {
    const currencies = await ctx.prisma.money.findMany();
    return { currencies };
  },
});
