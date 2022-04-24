import * as React from "react";
import { useCallback, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Navigatiebalk from "../components/Navigatiebalk";
import { useHistory } from "react-router-dom";
import { useAddProduct } from "../context/ProductProvider";
import { verkoperContext } from "../context/VerkoperProvider";
import { Alert } from "@mui/material";

const validationRules = {
  naam: {
    required: { value: true, message: "naam is required" },
    minLenght: { value: 2, message: "Min lenght is 2" },
  },
  verkoperId: {
    required: { value: true, message: "verkoperId is required" },
  },
  email: {
    required: { value: true, message: "email is required" },
  },
  prijs: {
    required: { value: true, message: "prijs is required" },
  },
  aantal: {
    required: { value: true, message: "aantal is required" },
    min: { value: 0, message: "aantal kan niet negatief zijn" },
  },
  beschrijving: {
    required: { value: true, message: "beschrijving is required" },
  },
};

export default function AddProductForm() {
  const { verkopers } = useContext(verkoperContext);
  const history = useHistory();
  const addProduct = useAddProduct();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    history.push("/Producten");
  };

  const handleClick = () => {
    history.push("/AddVerkoperForm");
  };

  const handleAddProduct = useCallback(
    async (verkoperId, naam, prijs, aantal, beschrijving) => {
      const succes = await addProduct({
        verkoperId,
        naam,
        prijs,
        aantal,
        beschrijving,
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
    [addProduct, reset]
  );

  const onSubmit = (data) => {
    let { verkoperId, naam, prijs, aantal, beschrijving } = data;

    handleAddProduct(verkoperId, naam, prijs, aantal, beschrijving);
  };

  let lijstVerkopers = [];
  verkopers.map((verkoper) => {
    lijstVerkopers = [...lijstVerkopers, verkoper];
    return lijstVerkopers;
  });

  return (
    <>
      <Navigatiebalk />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Product toevoegen </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("naam", validationRules.naam)}
              type="text"
              className="fadeIn second"
              placeholder="naam"
              data-cy="input_product_naam"
            />
            {errors["naam"] && (
              <p data-cy="input-error" className="red-text">
                {errors["naam"].message}
              </p>
            )}
            <select
              {...register("verkoperId", validationRules.verkoperId)}
              type="text"
              className="fadeIn third"
              placeholder="verkoper"
              data-cy="input_product_verkoperId"
            >
              {lijstVerkopers.map((verkoper) => {
                return (
                  <option value={verkoper.verkoperId}>{verkoper.naam}</option>
                );
              })}
            </select>
            <input
              {...register("prijs", validationRules.prijs)}
              type="number"
              className="fadeIn fourth"
              placeholder="prijs"
              min="0"
              step="any"
              data-cy="input_product_prijs"
            />
            {errors["prijs"] && (
              <p className="red-text">{errors["prijs"].message}</p>
            )}
            <input
              type="number"
              {...register("aantal", validationRules.aantal)}
              min="0"
              placeholder="aantal"
              className="fadeIn fifth"
              data-cy="input_product_aantal"
            />
            {errors["aantal"] && (
              <p className="red-text">{errors["aantal"].message}</p>
            )}
            <input
              {...register("beschrijving", validationRules.beschrijving)}
              type="text"
              className="fadeIn sixth"
              placeholder="beschrijving"
              data-cy="input_product_beschrijving"
            />
            {errors["beschrijving"] && (
              <p className="red-text">{errors["beschrijving"].message}</p>
            )}
            <input type="submit" data-cy="addProduct_submit" />
          </form>

          <div id="formFooter">
            <button
              className="underlineHover"
              onClick={handleCancel}
              data-cy="cancel_addProduct"
            >
              cancel
            </button>
            <br />
            <button className="underlineHover" onClick={handleClick}>
              Verkoper toevoegen
            </button>
          </div>
        </div>
        {open === true && <Alert severity="success">Product toegevoegd</Alert>}
        {open1 === true && <Alert severity="error">Toevoegen mislukt</Alert>}
      </div>
    </>
  );
}
