import { createRouter } from "../utils/router";

export const accountRouter = createRouter().query("list", {
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
});
