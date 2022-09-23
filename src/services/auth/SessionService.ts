import { User } from "@prisma/client";
import { IncomingMessage } from "http";
import Cookies from "js-cookie";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { NextApiRequest } from "next/dist/shared/lib/utils";

class SessionService {
  private readonly session_key = process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "_session";

  async clear() {
    return Cookies.remove(this.session_key);
  }

  async get(): Promise<User | null> {
    const token = Cookies.get(this.session_key);
    if (!token) return null;
    try {
      const decoded = verify(token, process.env.NEXT_PUBLIC_JWT_SECRET ?? "secret", {
        algorithms: ["HS256"],
      });

      console.log(decoded);

      return JSON.parse(JSON.stringify(decoded)).payload as User;
    } catch ({ message, code }) {
      return null;
    }
  }

  async getUserFromCookie(req: NextApiRequest | IncomingMessage) {
    const token = await this.getSessionTokenFromCookie(req);
    if (!token) return null;
    try {
      const decoded = verify(token.toString(), process.env.NEXT_PUBLIC_JWT_SECRET ?? "secret", {
        algorithms: ["HS256"],
      });

      return JSON.parse(JSON.stringify(decoded)).payload as User;
    } catch ({ message, code }) {
      return null;
    }
  }

  async getSessionTokenFromCookie(req: NextApiRequest | IncomingMessage): Promise<string | JwtPayload | null> {
    try {
      return (
        req?.headers
          ?.cookie!.split(";")
          .find((val) => val?.includes(process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME ?? "_session"))
          ?.split("=")[1] ?? null
      );
    } catch (e) {
      return null;
    }
  }

  async getUser(): Promise<User | undefined> {
    const user = await this.get();
    if (user != null) return user;
  }

  async set(payload: any): Promise<boolean> {
    try {
      /* TODO :: Expiration Date to token */

      sign({ payload }, process.env.NEXT_PUBLIC_JWT_SECRET ?? "secret", { algorithm: "HS256" }, (err, token) => {
        if (token != undefined) {
          console.log(this.session_key);
          Cookies.set(this.session_key, token, {
            sameSite: "Strict",
            /* secure: false, */
          });
        }
      });

      return true;
    } catch ({ message, code }) {
      console.log(message);
      return false;
    }
  }
}

export default SessionService;
