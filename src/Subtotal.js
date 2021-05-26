import React from "react";
import CurrencyFormat from "react-currency-format";
import "./subtotal.css";
import { GetContext } from "./StateProvider";
import { useHistory } from "react-router-dom";
function Subtotal() {
  const [{ basket }, dispatch] = GetContext();
  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):
              <strong className="strong"> {value}</strong>
            </p>
            <small className="gift_checkbox">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={basket
          .map((i) => i.price)
          .reduce((ac, i) => {
            return ac + i;
          }, 0)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />

      <button onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
