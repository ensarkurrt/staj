import { compare, hash } from "@/utils/password";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";
import { createRouter } from "../utils/router";

const authSchema = z.object({
  email: z.string(),
  password: z.string(),
});

function exclude<User, Key extends keyof User>(user: User, ...keys: Key[]): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export const authRouter = createRouter()
  .mutation("login", {
    input: authSchema,
    async resolve({ ctx, input }) {
      const user: User | null = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) throw new Error("User credentials are invalid");
      const isEuqal = await compare(input.password, user.password);
      if (!isEuqal) throw new Error("User credentials are invalid");
      exclude(user, "password");
      return { message: "Login Success", user };
    },
  })
  .mutation("register", {
    input: z
      .object({
        name: z.string().min(3),
        tckn: z.string().min(11).max(11),
        phone: z.string().min(12),
      })
      .merge(authSchema),
    async resolve({ ctx, input }) {
      try {
        const hashedPassword = await hash(input.password);
        const user = await ctx.prisma.user.create({
          data: {
            phone: input.phone,
            tckn: input.tckn,
            name: input.name,
            email: input.email,
            password: hashedPassword,
          },
          select: {
            id: true,
            tckn: true,
            email: true,
            name: true,
            phone: true,
          },
        });
        return { message: "Register Success", user };
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") throw new Error("User already exists");
          else throw error;
        }
        throw error;
      }
    },
  });
