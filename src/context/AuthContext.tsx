import SessionService from "@/services/auth/SessionService";

import { createContext, FC, useCallback, useContext, useMemo, useReducer } from "react";
import {User} from "@prisma/client";

interface AuthPayload {
  user: User | null;
}

interface AuthActions {
  login: (user: User) => void;
  register: () => void;
}

type AuthContextType = AuthPayload & { actions: AuthActions };

const noop = () => {};

const initialContext: AuthContextType = {
  user: null,
  actions: {
    login: noop,
    register: noop,
  },
};

const AuthContext = createContext<AuthContextType>(initialContext);

type AuthAction =
  | {
      type: "set";
      user: User | null;
    }
  | {
      type: "login";
      user: User;
    }
  | {
      type: "register";
    };

const reducer = (state: AuthPayload, action: AuthAction) => {
  switch (action.type) {
    case "set":
      return {
        ...state,
        user: action.user,
      };
    case "login":
      return {
        ...state,
        user: action.user,
      };
    /*
    case "remove":
      const targets = { ...state.targets };
      delete targets[action.id];

      return {
        ...state,
        targets,
      }; */
    default:
      return state;
  }
};

export const useAuthContext = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthContextManager: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialContext);

  const initial = () => {
    const service = new SessionService();
    service
      .getUser()
      .then((user: User) => {
        if (user != undefined) dispatch({ type: "set", user });
      })
      .catch(() => {
        dispatch({ type: "set", user: null });
      });
  };

  if (state.user == null) initial();

  const login = useCallback((user: User) => {
    dispatch({ type: "login", user });
  }, []);

  const register = useCallback(() => {
    /* dispatch({ type: "remove", id }); */
  }, []);

  const actions = useMemo(() => {
    return { login, register };
  }, [login, register]);

  const api: AuthContextType = {
    user: state.user,
    actions,
  };

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
};
