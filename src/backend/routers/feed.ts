import { createRouter } from "../utils/router";
import {
  createCommentSchema,
  createFeedSchema,
  likeFeedSchema,
  listHomeFeedSchema,
} from "./../validators/feed-validator";

export const feedRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) throw new Error("Not logged in!");
    return next();
  })
  .query("list.home", {
    input: listHomeFeedSchema,
    async resolve({ ctx, input }) {
      const limit: number = input?.limit ?? 10;
      const cursor: string | undefined | null = input?.cursor;

      const items = await ctx.prisma.feedPost.findMany({
        take: limit + 1,
        /* TODO ::From following user */
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
          /* mysql://3js85urdc4un:pscale_pw_O_KS9Ym15sA29Ph8zR70nQMmXRQkkK8i5HNDdHwlmPU@xrn3r6h7vtxy.eu-central-1.psdb.cloud/enode?sslaccept=strict */
        },
        include: {
          author: true,
          likes: true,
        },
      });

      let nextCursor: typeof cursor | null = null;

      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    },
  })
  .mutation("create", {
    input: createFeedSchema,
    async resolve({ ctx, input }) {
      const { content } = input;
      const author = ctx.user;
      try {
        const post = await ctx.prisma.feedPost.create({
          data: {
            content,
            images: [],
            author: {
              connect: {
                id: author!.id,
              },
            },
          },
          include: {
            author: true,
            likes: true,
          },
        });
        return { message: "Post created successfully", post };
      } catch (error) {
        throw error;
      }
    },
  })
  .mutation("like.change", {
    input: likeFeedSchema,
    async resolve({ ctx, input }) {
      const { postId } = input;
      const author = ctx.user;
      console.log(postId);
      console.log(author);

      try {
        const isLikeExists = await ctx.prisma.feedPostLike.findFirst({
          where: {
            user: {
              id: author!.id,
            },
            feedPost: {
              id: postId,
            },
          },
        });

        if (!isLikeExists) {
          await ctx.prisma.feedPostLike.create({
            data: {
              feedPost: {
                connect: {
                  id: postId,
                },
              },
              user: {
                connect: {
                  id: author!.id,
                },
              },
            },
          });
        } else {
          await ctx.prisma.feedPostLike.delete({
            where: {
              id: isLikeExists!.id,
            },
          });
        }

        return { message: `Post successfuly ${isLikeExists ? "unliked" : "liked"}` };
      } catch (error) {
        throw error;
      }
    },
  })
  .mutation("comment.create", {
    input: createCommentSchema,
    async resolve({ ctx, input }) {
      const { postId, content } = input;
      const author = ctx.user;
      try {
        const comment = await ctx.prisma.feedPostComment.create({
          data: {
            content,
            feedPost: {
              connect: {
                id: postId,
              },
            },
            author: {
              connect: {
                id: author!.id,
              },
            },
          },
          include: {
            author: true,
          },
        });
        return { message: "Comment created successfully", comment };
      } catch (error) {
        throw error;
      }
    },
  });
