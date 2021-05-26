import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import BasketItem from "./BasketItem";
import { GetContext } from "./StateProvider";
function Checkout() {
  const [{ basket, user }, dispatch] = GetContext();
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="banner"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668.jpg"
          alt=""
        />
        <h3>Hello,{user?.email}</h3>
        <h2 className="basket_header">Your shopping Basket</h2>

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

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
