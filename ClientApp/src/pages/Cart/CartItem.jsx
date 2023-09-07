import React from "react";
import * as CI from "./style";
import { formatCurrency } from "../../utils/formatCurrency";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";

const CartItem = (props) => {
  const { product, quantity, onIncreItem, onDecreItem, onDeleteItem } = props;
  return (
    <div className="d-flex align-items-center mb-3">
      <CI.ProductImage>
        <img
          src={`https://localhost:5001${product.productImages[0].imageUrl}`}
          alt=""
          className="w-100"
        />
      </CI.ProductImage>
      <CI.ProductInfo>
        <h5>{product.name}</h5>
        <p style={{ color: "#55595c" }}>{formatCurrency(product.price)} ₫</p>
      </CI.ProductInfo>
      <CI.Action>
        <IconButton color="primary" onClick={() => onDecreItem(product.id)}>
          <RemoveIcon />
        </IconButton>
        <input
          readOnly
          value={quantity}
          style={{ width: "30px", textAlign: "center" }}
        />
        <IconButton
          color="primary"
          onClick={() => onIncreItem({ product: product, quantity: 1 })}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          color="secondary"
          onClick={() => onDeleteItem(product.id)}
        >
          <DeleteIcon />
        </IconButton>
      </CI.Action>
      <CI.TotalItem>{formatCurrency(product.price * quantity)} ₫</CI.TotalItem>
    </div>
  );
};

export default CartItem;
