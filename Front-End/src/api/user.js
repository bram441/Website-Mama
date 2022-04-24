import { axios } from ".";

export const getUsers = async () => {
  const { data } = await axios.get(`user/`);
  return data;
};

export const getUserByEmail = async (email) => {
  const data = await axios.get(`user/${email}`);
  return data;
};

export const login = async ({ email, password }) => {
  const { data } = await axios.post(`user/login`, {
    email,
    password,
  });
  return data;
};

export const register = async ({
  voornaam,
  achternaam,
  email,
  geboorteDatum,
  password,
}) => {
  const { data } = await axios.post(`user/register`, {
    voornaam,
    achternaam,
    email,
    geboorteDatum,
    password,
  });
  return data;
};

export const getUserById = async (userId) => {
  const { data } = await axios.get(`user/getUserById/${userId}`);
  return data;
};

export const deleteUserById = async (userId) => {
  const { data } = await axios.post(`user/delete/${userId}`);
  return data;
};
