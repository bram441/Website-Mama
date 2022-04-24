import { axios } from ".";

export const getAllVerkopers = async () => {
  const { data } = await axios.get(`verkoper/`);
  return { data };
};

export const addVerkoper = async ({ naam, land, tel, email }) => {
  let method = "post";
  let url = `verkoper/addVerkoper`;
  const Verkoper = await axios({
    method,
    url,
    data: { naam, land, tel, email },
  });
  return Verkoper;
};

export const deleteVerkoper = async (naam) => {
  const { data } = await axios({
    method: "delete",
    url: `verkoper/deleteVerkoper/${naam}`,
  });
  return data;
};
