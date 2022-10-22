import { compare, hash } from "@/utils/password";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { z } from "zod";
import { createRouter } from "../utils/router";

const authSchema = z.object({
  tckn: z.string().min(11).max(11),
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
          tckn: input.tckn,
        },
      });

      if (!user) throw new Error("Giriş bilgileri hatalı");
      const isEuqal = await compare(input.password, user.password);
      if (!isEuqal) throw new Error("Giriş bilgileri hatalı");
      exclude(user, "password");
      return { message: "Giriş Başarılı", user };
    },
  })
  .mutation("register", {
    input: z
      .object({
        name: z.string().min(3),
        email: z.string().email(),
        phone: z.string().min(12).max(12),
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
        return { message: "Kayıt Başarılı!", user };
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") throw new Error("Bu Kullanıcı Zaten Kayıtlı!");
          else throw error;
        }
        throw error;
      }
    },
  });
