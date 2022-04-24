import * as React from "react";
import { useCallback, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Navigatiebalk from "../components/Navigatiebalk";
import { useHistory } from "react-router-dom";
import { useEditProduct } from "../context/ProductProvider";
import { verkoperContext } from "../context/VerkoperProvider";
import { Alert } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function EditProductForm() {
  const location = useLocation();
  const { productId, verkoperId, naam, prijs, aantal, beschrijving } =
    location.state;
  const { verkopers } = useContext(verkoperContext);
  const history = useHistory();
  const editProduct = useEditProduct();
  const [open, setOpen] = useState(false);
  const origineleNaam = naam;

  const { register, handleSubmit } = useForm();

  const handleCancel = () => {
    history.replace("/Producten");
  };

  const handleEditProduct = useCallback(
    async (verkoperId, naam, prijs, aantal, beschrijving) => {
      const succes = await editProduct({
        productId,
        origineleNaam,
        verkoperId,
        naam,
        prijs,
        aantal,
        beschrijving,
      });
      if (succes) {
        history.replace("/Producten");
      } else {
        setOpen(true);
      }
    },
    [editProduct, productId, history, origineleNaam]
  );

  const onSubmit = (data) => {
    let { verkoperId, naam, prijs, aantal, beschrijving } = data;

    handleEditProduct(verkoperId, naam, prijs, aantal, beschrijving);
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
          <h2 className="active">Product aanpassen ( ID = {productId}) </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("naam", { required: true })}
              type="text"
              className="fadeIn second"
              placeholder="naam"
              defaultValue={naam}
              data-cy="editProduct_naam_input"
            />
            <select
              {...register("verkoperId", { required: true })}
              type="text"
              className="fadeIn third"
              placeholder="verkoper"
              defaultValue={verkoperId}
            >
              {lijstVerkopers.map((verkoper) => {
                return (
                  <option value={verkoper.verkoperId}>{verkoper.naam}</option>
                );
              })}
            </select>
            <input
              {...register("prijs", { required: true })}
              type="number"
              className="fadeIn fourth"
              placeholder="prijs"
              defaultValue={prijs}
              pattern="[0-9]+([\.,][0-9]+)?"
              min="0"
            />
            <input
              type="number"
              {...register("aantal", {
                required: true,
              })}
              min="0"
              placeholder="aantal"
              defaultValue={aantal}
              className="fadeIn fifth"
            />
            <input
              {...register("beschrijving", { required: true })}
              type="text"
              className="fadeIn sixth"
              defaultValue={beschrijving}
              placeholder="beschrijving"
            />
            <input type="submit" data-cy="submit_edit_product" />
          </form>

          <div id="formFooter">
            <button className="underlineHover" href="#" onClick={handleCancel}>
              cancel
            </button>
          </div>
        </div>
        {open === true && (
          <Alert data-cy="editProduct_error" severity="error">
            aanpassen mislukt
          </Alert>
        )}
      </div>
    </>
  );
}
