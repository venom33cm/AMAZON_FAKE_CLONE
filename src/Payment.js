import { React, useState, useEffect } from "react";
import { GetContext } from "./StateProvider";
import BasketItem from "./BasketItem";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import axios from "./axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./payment.css";
import { db } from "./firebase.js";

function Payment() {
  const [{ basket, user }, dispatch] = GetContext();
  const stripe = useStripe();
  const elements = useElements();

  const [disabled, setdisabled] = useState(true);
  const [error, seterror] = useState(null);
  const [processing, setprocessing] = useState("");
  const [succeeded, setsucceeded] = useState(false);
  const [ClientSecret, setClientSecret] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${
          basket
            ?.map((i) => i.price)
            .reduce((ac, i) => {
              return ac + i;
            }, 0) * 100
        }`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("THE CLIENT SECRET KEY IS>>>>", ClientSecret);

  const HandleSubmit = async (event) => {
    event.preventDefault();
    setprocessing(true);
    const payload = await stripe
      .confirmCardPayment(ClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent is kinda like payment successfull
        setsucceeded(true);
        setprocessing(false);
        seterror(null);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        dispatch({
          type: "AFTER_ORDER",
        });

        history.replace("/Order");
      });
  };

  const HandleChange = (event) => {
    //listen to changes
    //and put error if wrong
    setdisabled(event.empty);
    seterror(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} Items</Link>)
        </h1>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{user?.email} </p>
            <p> Dummy Address </p>
            <p>123 ReactDev</p>
            <p> NewDelhi,India</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment_Items">
            {basket.map((item) => (
              <BasketItem
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_card">
            <form onSubmit={HandleSubmit}>
              <CardElement onChange={HandleChange} />
              <div className="cardetail_container">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>order Total: {value}</h3>
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
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
