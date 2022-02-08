import { createContext, useEffect, useReducer } from "react";
import PropTypes, { any } from "prop-types";
import { authApi } from "../__fake-api__/auth-api";
import { useMoralis } from "react-moralis";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  platform: "WEB3",
  login: () => Promise.resolve(),
  moralisLogout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { logout, authenticate, isAuthenticated, user } = useMoralis();

  useEffect(() => {
    if (user) {
      console.log("we have a user");
    } else if (isAuthenticated) {
      console.log("we are authenticated");
    }

    const initialize = async () => {
      try {
        if (isAuthenticated) {
          console.log("number 1");
          console.log("here is the user data", user);

          // dispatch({
          //   type: "INITIALIZE",
          //   payload: {
          //     isAuthenticated: true,
          //     user: {
          //       id: user.id,
          //       avatar: user.picture,
          //       email: user.email,
          //       name: "Kirk Washam",
          //       plan: "Premium",
          //     },
          //   },
          // });

          dispatch({
            type: "LOGIN",
            payload: {
              user: {
                id: user.get("ethAddress"),
                avatar: "/static/mock-images/avatars/avatar-anika_visser.png",
                email: user.email,
                name: user.get("ethAddress"),
                plan: user.get("ethAddress"),
              },
            },
          });
        } else {
          console.log("number 2");
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [isAuthenticated, user]);

  const login = async () => {
    if (!isAuthenticated) {
      console.log("in myLogin");

      await authenticate();
    }
  };

  const moralisLogout = async () => {
    logout();
    dispatch({ type: "LOGOUT" });
  };

  const register = async (email, name, password) => {
    const accessToken = await authApi.register({ email, name, password });
    const user = await authApi.me(accessToken);

    localStorage.setItem("accessToken", accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "WEB3",
        login,
        moralisLogout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
