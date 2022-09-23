import { z } from "zod";

export const createCommentSchema = z.object({
  postId: z.string(),
  content: z.string().min(3).max(255),
});

export const likeFeedSchema = z.object({
  postId: z.string(),
});

export const createFeedSchema = z.object({
  content: z.string().min(3).max(255),
});

export const listHomeFeedSchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.string().nullish(),
});

export type CreateFeedComment = z.infer<typeof createCommentSchema>;
