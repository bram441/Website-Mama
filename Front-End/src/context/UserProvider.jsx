import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import * as usersApi from "../api/user";
import * as api from "../api/index";
import config from "../config.json";

const JWT_TOKEN_KEY = config.token_key;
const userVoornaam = config.user_name;

export const UserContext = createContext();

function parseJwt(token) {
  if (!token) return {};
  const base64Url = token.split(".")[1];
  const payload = Buffer.from(base64Url, "base64");
  const jsonPayload = payload.toString("ascii");
  return JSON.parse(jsonPayload);
}

function parseExp(exp) {
  if (!exp) return null;
  if (typeof exp !== "number") exp = Number(exp);
  if (isNaN(exp)) return null;
  return new Date(exp * 1000);
}

export const useUser = () => useContext(UserContext);

export const useSession = () => {
  const { loading, error, token, user, hasRole, voornaam } = useUser();
  return {
    loading,
    error,
    token,
    user,
    isAuthed: Boolean(token),
    isAdmin: hasRole("admin"),
    voornaam,
  };
};

export const useLogin = () => {
  const { login } = useUser();
  return login;
};

export const useLogout = () => {
  const { logout } = useUser();
  return logout;
};

export const useRegister = () => {
  const { registerUser } = useUser();
  return registerUser;
};

export const useDelete = () => {
  const { deleteUser } = useUser();
  return deleteUser;
};

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [voornaam, setVoornaamNaam] = useState(
    localStorage.getItem(userVoornaam)
  );

  const setSession = useCallback(async (token, user) => {
    const { exp, userId } = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }

    api.setAuthToken(token);
    setToken(token);
    if (!user && stillValid) {
      user = await usersApi.getUserById(userId);
    }
    setUser(user);
  }, []);

  useEffect(() => {
    setSession(token);
  }, [token, setSession]);

  useEffect(() => {
    async function procesUser() {
      api.setAuthToken(token);
      const { userId } = parseJwt(token);
      if (typeof userId !== "undefined" && userId !== null) {
        const user = await usersApi.getUserById(userId);
        setUser(user);
      }

      if (token) {
        localStorage.setItem(JWT_TOKEN_KEY, token);
      } else {
        localStorage.removeItem(JWT_TOKEN_KEY);
        localStorage.removeItem(userVoornaam);
        setSession(null);
        setUser(null);
        setVoornaamNaam(null);
      }
    }
    procesUser();
  }, [token, setSession]);

  useEffect(() => {
    if (voornaam) {
      localStorage.setItem(userVoornaam, voornaam);
    } else {
      localStorage.removeItem(userVoornaam);
    }
  }, [voornaam]);

  const getUsers = useCallback(async () => {
    const users = await usersApi.getUsers();
    return users;
  }, []);

  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        setError("");
        const { token, user } = await usersApi.login({ email, password });
        await setSession(token, user);
        setVoornaamNaam(user.voornaam);
        return true;
      } catch (error) {
        console.error(error);
        setError("Login failed, try again");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setSession]
  );

  const registerUser = useCallback(
    async ({ voornaam, achternaam, email, geboorteDatum, password }) => {
      try {
        setLoading(false);
        setError("");
        const user = await usersApi.register({
          voornaam,
          achternaam,
          email,
          geboorteDatum,
          password,
        });
        if (user) {
          await login(email, password);
          return true;
        } else {
          console.error(error);
          setError("Register failed, try again");
          return false;
        }
      } catch (error) {
        console.error(error);
        setError("Register failed, try again");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [login, error]
  );

  const deleteUser = useCallback(async (userId) => {
    try {
      await usersApi.deleteUserById(userId);
      setError("");
      return true;
    } catch (error) {
      setError("Delete failed");
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setUser(null);
    setVoornaamNaam(null);
    return true;
  }, [setSession]);

  const hasRole = useCallback(
    (role) => {
      if (!user) return false;
      return user?.roles?.includes(role);
    },
    [user]
  );

  const value = useMemo(
    () => ({
      token,
      user,
      error,
      loading,
      login,
      logout,
      registerUser,
      getUsers,
      voornaam,
      hasRole,
      deleteUser,
    }),
    [
      token,
      user,
      error,
      loading,
      login,
      logout,
      registerUser,
      getUsers,
      voornaam,
      hasRole,
      deleteUser,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
