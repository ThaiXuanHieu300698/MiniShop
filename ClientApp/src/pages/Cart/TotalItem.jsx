import React from "react";
import Link from "@material-ui/core/Link";
import { formatCurrency } from "../../utils/formatCurrency";
const TotalItem = (props) => {
  const { totalItem, totalPayment } = props;
  return (
    <div
      className="flex-fill ml-2"
      style={{ border: "1px solid rgba(0,0,0,.125)", padding: "10px" }}
    >
      <div className="totalItem">
        <p style={{ color: "#55595c" }}>Total Items</p>
        <b>{totalItem}</b>
      </div>
      <div className="totalPayment">
        <p style={{ color: "#55595c" }}>Total payment</p>
        <b>{formatCurrency(totalPayment)} ₫</b>
      </div>
      <hr />
      <Link href="/checkout">Checkout &#8594;</Link>
    </div>
  );
};

export default TotalItem;
