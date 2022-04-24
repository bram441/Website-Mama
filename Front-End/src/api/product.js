import { axios } from ".";

export const getAllProducten = async () => {
  const { data } = await axios.get(`product/`);
  return { data };
};

export const addProduct = async ({
  verkoperId,
  naam,
  prijs,
  aantal,
  beschrijving,
}) => {
  let method = "post";
  let url = `product/addProduct`;
  const addProduct = await axios({
    method,
    url,
    data: { verkoperId, naam, prijs, aantal, beschrijving },
  });
  return addProduct;
};

export const updateProduct = async ({
  productId,
  origineleNaam,
  verkoperId,
  naam,
  prijs,
  aantal,
  beschrijving,
}) => {
  let method = "put";
  let url = `product/updateProduct/${productId}`;
  const product = await axios({
    method,
    url,
    data: { origineleNaam, verkoperId, naam, prijs, aantal, beschrijving },
  });
  return product;
};

export const deleteProduct = async (productId) => {
  const { data } = await axios({
    method: "delete",
    url: `product/deleteProduct/${productId}`,
  });
  return data;
};
