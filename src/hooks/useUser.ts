import { User } from "@prisma/client";
import { useEffect, useState } from "react";

import SessionService from "../services/auth/SessionService";

export default function useSession(): [User | null, CallableFunction] {
  const hasWindow = typeof window !== "undefined";

  const [session, setSession] = useState<User | null>(null);
  const [service, setService] = useState<SessionService | null>(new SessionService());

  useEffect(() => getSessionUser, []);

  function getSessionUser(): any {
    if (!hasWindow) return;
    if (!service) {
      setService(new SessionService());
      return getSessionUser();
    }

    service.getUser().then((user) => {
      if (user != undefined) setSession(user);
      else getSessionUser();
    });
  }

  return [session, getSessionUser];
}
