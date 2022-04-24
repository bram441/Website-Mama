import {
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
} from "react";
import * as apiProduct from "../api/product";

export const productContext = createContext();
export const useProduct = () => useContext(productContext);

export const useAddProduct = () => {
  const { addProduct } = useProduct();
  return addProduct;
};

export const useEditProduct = () => {
  const { editProduct } = useProduct();
  return editProduct;
};

export const ProductProvider = ({ children }) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [producten, setProducten] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const refreshProducten = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const { data } = await apiProduct.getAllProducten();
      setProducten(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      refreshProducten();
      setInitialLoad(true);
    }
  }, [initialLoad, refreshProducten]);

  const addProduct = useCallback(
    async ({ verkoperId, naam, prijs, aantal, beschrijving }) => {
      try {
        const newProduct = await apiProduct.addProduct({
          verkoperId,
          naam,
          prijs,
          aantal,
          beschrijving,
        });
        if (newProduct) {
          refreshProducten();
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
    [refreshProducten]
  );

  const editProduct = useCallback(
    async ({
      productId,
      origineleNaam,
      verkoperId,
      naam,
      prijs,
      aantal,
      beschrijving,
    }) => {
      try {
        await apiProduct.updateProduct({
          productId,
          origineleNaam,
          verkoperId,
          naam,
          prijs,
          aantal,
          beschrijving,
        });
        refreshProducten();
        return true;
      } catch (error) {
        setError(error);
      }
    },
    [refreshProducten]
  );

  const deleteProduct = useCallback(
    async (productId) => {
      try {
        await apiProduct.deleteProduct(productId);
        refreshProducten();
        return true;
      } catch (error) {
        setError(error);
      }
    },
    [refreshProducten]
  );

  /*   useEffect(() => {
    if (userReady) {
      refreshProducten();
    }
  }, [refreshProducten, userReady]); */
  return (
    <productContext.Provider
      value={{
        producten,
        refreshProducten,
        addProduct,
        deleteProduct,
        editProduct,
        error,
        loading,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
