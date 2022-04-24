import * as React from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Navigatiebalk from "../components/Navigatiebalk";
import { Link, useHistory } from "react-router-dom";
import { useRegister } from "../context/UserProvider";
import { Alert } from "@mui/material";

const validationRules = {
  voornaam: {
    required: { value: true, message: "voornaam is required" },
    minLenght: { value: 2, message: "Min lenght is 2" },
  },
  achternaam: {
    required: { value: true, message: "achternaam is required" },
    minLenght: { value: 2, message: "Min lenght is 2" },
  },
  email: {
    required: { value: true, message: "email is required" },
  },
  geboorteDatum: {
    required: { value: true, message: "geboorteDatum is required" },
    valueAsDate: true,
  },
  password: {
    required: { value: true, message: "password is required" },
    minLenght: { value: 5, message: "Min lenght is 5" },
  },
  bevestigPassword: {
    required: { value: true, message: "bevestigPassword is required" },
  },
};

export default function Register() {
  const registerUser = useRegister();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleCancel = () => {
    history.replace("/");
  };

  const handleReset = () => {
    reset();
  };

  const handleRegister = useCallback(
    async (voornaam, achternaam, email, geboorteDatum, password) => {
      const succes = await registerUser({
        voornaam,
        achternaam,
        email,
        geboorteDatum,
        password,
      });
      if (succes) {
        history.push({
          pathname: "/NotificationScreen",
          state: { type: "success", message: "Gebruiker gerigistreerd" },
        });
      } else {
        setOpen(true);
      }
    },
    [registerUser, history]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let {
      voornaam,
      achternaam,
      email,
      geboorteDatum,
      password,
      bevestigPassword,
    } = data;
    const stringifyData = (geboorteDatum) => {
      let day = geboorteDatum.getDate().toString();
      let month = (geboorteDatum.getMonth() + 1).toString();
      let year = geboorteDatum.getFullYear().toString();
      const stringData = day + month + year;
      return stringData;
    };
    geboorteDatum = stringifyData(geboorteDatum);

    if (password === bevestigPassword) {
      handleRegister(voornaam, achternaam, email, geboorteDatum, password);
    } else {
      setOpen1(true);
    }
  };

  return (
    <>
      <Navigatiebalk />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="inactive underlineHover">
            <Link className="links" to="/Login">
              Log in
            </Link>
          </h2>
          <h2 className="active">Registreren </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("voornaam", validationRules.voornaam)}
              type="text"
              className="fadeIn second"
              placeholder="voornaam"
            />
            {errors["voornaam"] && (
              <p className="red-text">{errors["voornaam"].message}</p>
            )}
            <input
              {...register("achternaam", validationRules.achternaam)}
              type="text"
              className="fadeIn third"
              placeholder="achternaam"
            />
            {errors["achternaam"] && (
              <p className="red-text">{errors["achternaam"].message}</p>
            )}
            <input
              {...register("email", validationRules.email)}
              type="email"
              className="fadeIn fourth"
              placeholder="email"
            />
            {errors["email"] && (
              <p className="red-text">{errors["email"].message}</p>
            )}
            <input
              type="date"
              {...register("geboorteDatum", validationRules.geboorteDatum)}
              placeholder="dd-mm-yyyy"
              className="fadeIn fifth"
            />
            {errors["geboorteDatum"] && (
              <p className="red-text">{errors["geboorteDatum"].message}</p>
            )}
            <input
              {...register("password", validationRules.password)}
              type="password"
              className="fadeIn sixth"
              placeholder="password"
            />
            {errors["password"] && (
              <p className="red-text">{errors["password"].message}</p>
            )}
            <input
              {...register(
                "bevestigPassword",
                validationRules.bevestigPassword
              )}
              type="password"
              className="fadeIn seventh"
              placeholder="bevestig password"
            />
            {errors["bevestigPassword"] && (
              <p className="red-text">{errors["bevestigPassword"].message}</p>
            )}
            <input type="submit" />
          </form>

          <div id="formFooter">
            <button className="underlineHover" href="#" onClick={handleCancel}>
              Cancel
            </button>
            <p></p>
            <button className="underlineHover" href="#" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        {open === true && <Alert severity="error">Register failed</Alert>}
        {open1 === true && (
          <Alert severity="error">
            Password en Controle password zijn niet gelijk
          </Alert>
        )}
      </div>
    </>
  );
}
