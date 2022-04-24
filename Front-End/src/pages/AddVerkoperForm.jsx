import * as React from "react";
import { useCallback, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Navigatiebalk from "../components/Navigatiebalk";
import { useHistory } from "react-router-dom";
import { verkoperContext } from "../context/VerkoperProvider";
import { Alert } from "@mui/material";

export default function AddVerkoperForm() {
  const { addVerkoper } = useContext(verkoperContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const handleCancel = () => {
    history.replace("/AddProductForm");
  };

  const handleAddVerkoper = useCallback(
    async (naam, land, tel, email) => {
      const succes = await addVerkoper({
        naam,
        land,
        tel,
        email,
      });
      if (succes) {
        reset();
        setOpen1(false);
        setOpen(true);
      } else {
        setOpen(false);
        setOpen1(true);
      }
    },
    [addVerkoper, reset]
  );

  const onSubmit = (data) => {
    let { naam, land, tel, email } = data;

    handleAddVerkoper(naam, land, tel, email);
  };

  return (
    <>
      <Navigatiebalk />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Vekoper toevoegen </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("naam", { required: true })}
              type="text"
              className="fadeIn third"
              placeholder="naam"
            />
            <input
              {...register("land", { required: true })}
              type="text"
              className="fadeIn fourth"
              placeholder="land"
            />
            <input
              type="text"
              {...register("tel", {
                required: true,
              })}
              placeholder="tel"
              className="fadeIn fifth"
            />
            <input
              {...register("email", { required: true })}
              type="email"
              className="fadeIn sixth"
              placeholder="email"
            />
            <input type="submit" />
          </form>

          <div id="formFooter">
            <button className="underlineHover" href="#" onClick={handleCancel}>
              go back
            </button>
          </div>
        </div>
        {open === true && <Alert severity="success">Verkoper toegevoegd</Alert>}
        {open1 === true && <Alert severity="error">Toevoegen mislukt</Alert>}
      </div>
    </>
  );
}
