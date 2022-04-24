import { memo, useCallback, useContext } from "react";
import { productContext } from "../context/ProductProvider";
import { useSession } from "../context/UserProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const Product = memo(
  ({ productId, verkoperId, naam, prijs, aantal, beschrijving }) => {
    const { deleteProduct } = useContext(productContext);
    const { isAdmin } = useSession();
    let checkRole = true;
    if (isAdmin) {
      checkRole = false;
    }

    const handleDelete = useCallback(() => {
      if (isAdmin) {
        deleteProduct(productId);
      }
    }, [deleteProduct, productId, isAdmin]);
    return (
      <tr data-cy="product">
        <td data-cy="product_productId">{productId}</td>
        <td data-cy="product_verkoperId">{verkoperId}</td>
        <td data-cy="product_naam">{naam}</td>
        <td data-cy="product_prijs">{prijs} &euro;</td>
        <td data-cy="product_aantal">#{aantal}</td>
        <td data-cy="product_beschrijving">{beschrijving}</td>
        <td hidden={checkRole}>
          <button>
            <Link
              data-cy="product_edit_button"
              to={{
                pathname: "/EditProductForm",
                state: {
                  productId,
                  verkoperId,
                  naam,
                  prijs,
                  aantal,
                  beschrijving,
                },
              }}
            >
              <EditIcon />
            </Link>
          </button>
        </td>
        <td hidden={checkRole}>
          <button data-cy="product_delete_button" onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </td>
      </tr>
    );
  }
);

export default Product;
