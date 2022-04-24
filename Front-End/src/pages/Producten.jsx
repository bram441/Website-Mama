import React, { useContext } from "react";
import Navigatiebalk from "../components/Navigatiebalk";
import { productContext } from "../context/ProductProvider";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useSession } from "../context/UserProvider";

export default function ProductenPage() {
  const { producten, error } = useContext(productContext);
  const { isAdmin } = useSession();
  let roleChecker = true;
  if (isAdmin) {
    roleChecker = false;
  }

  if (error) return <pre>{error.message}</pre>;
  if (!producten) return <h1>kan producten niet inladen</h1>;
  return (
    <>
      <Navigatiebalk />
      <div className="webshop">
        <h1>Producten lijst</h1>
        <p>Hier vind je een lijst met verkrijgbare producten.</p>
        <ProductList />
        <div className="webschopknoppen">
          <Button
            variant="contained"
            disabled={roleChecker}
            data-cy="button_addForm"
          >
            <Link to="/AddProductForm">Product toevoegen</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
