import SessionService from "@/services/auth/SessionService";
import { User } from "@prisma/client";
import { createContext, FC, useCallback, useContext, useMemo, useReducer } from "react";

interface AuthPayload {
  user: User | null;
}

interface AuthActions {
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
}

type AuthContextType = AuthPayload & { actions: AuthActions };

const noop = () => {};

const initialContext: AuthContextType = {
  user: null,
  actions: {
    login: noop,
    register: noop,
    logout: noop,
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
      user: User;
    }
  | {
      type: "logout";
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

    case "register":
      return {
        ...state,
        user: action.user,
      };
    case "logout":
      return {
        ...state,
        user: null,
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
      .then((user) => {
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

  const register = useCallback((user: User) => {
    dispatch({ type: "register", user });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "logout" });
  }, []);

  const actions = useMemo(() => {
    return { login, register, logout };
  }, [login, register, logout]);

  const api: AuthContextType = {
    user: state.user,
    actions,
  };

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
};
