import {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
} from "react";
import * as apiVerkoper from "../api/verkoper";
import { useSession } from "./UserProvider";

export const verkoperContext = createContext();
export const useVerkoper = () => useContext(verkoperContext);

export const VerkoperProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [verkopers, setVerkopers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { ready: userReady } = useSession();

  const refreshVerkopers = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const { data } = await apiVerkoper.getAllVerkopers();
      setVerkopers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      refreshVerkopers();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshVerkopers]);

  const addVerkoper = useCallback(
    async ({ naam, land, tel, email }) => {
      try {
        const newVerkoper = await apiVerkoper.addVerkoper({
          naam,
          land,
          tel,
          email,
        });
        if (newVerkoper) {
          refreshVerkopers();
          return true;
        } else {
          return false;
        }
      } catch (error) {
        setError(error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [refreshVerkopers]
  );

  const deleteVerkoper = useCallback(
    async (naam) => {
      try {
        await apiVerkoper.deleteVerkoper(naam);
        refreshVerkopers();
        return true;
      } catch (error) {
        setError(error);
      }
    },
    [refreshVerkopers]
  );

  useEffect(() => {
    if (userReady) {
      refreshVerkopers();
    }
  }, [refreshVerkopers, userReady]);

  return (
    <verkoperContext.Provider
      value={{
        verkopers,
        refreshVerkopers,
        addVerkoper,
        deleteVerkoper,
        error,
        loading,
      }}
    >
      {children}
    </verkoperContext.Provider>
  );
};
