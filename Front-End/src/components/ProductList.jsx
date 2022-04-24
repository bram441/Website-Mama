import Product from "./Product";
import React, { useContext } from "react";
import { productContext } from "../context/ProductProvider";
import { useSession } from "../context/UserProvider";

export default function ProductList() {
  const { producten } = useContext(productContext);
  const { isAdmin } = useSession();
  let checkRole = true;
  if (isAdmin) {
    checkRole = false;
  }
  return (
    <div className="table-wrapper">
      <table className="fl-table">
        <thead>
          <tr>
            <th>productId</th>
            <th>verkoperId</th>
            <th>naam</th>
            <th>prijs</th>
            <th>aantal</th>
            <th>beschrijving</th>
            <th hidden={checkRole}>Edit</th>
            <th hidden={checkRole}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {producten.map((product) => {
            return <Product key={product.productId} {...product} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
