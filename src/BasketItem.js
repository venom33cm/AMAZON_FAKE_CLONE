import React from "react";
import "./basket.css";
import { GetContext } from "./StateProvider";
function BasketItem({ id, title, image, price, rating, hidebutton }) {
  const [{ basket }, dispatch] = GetContext();
  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      id: id,
    });
  };
  return (
    <div className="basketItem">
      <img src={image} className="basket_pic" />
      <div className="basketItem_info">
        <p className="basketItem_title">{title}</p>

        <p className="basketItem_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="basketItem_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hidebutton && (
          <button onClick={removeItem}>Remove Basket Item</button>
        )}
      </div>
    </div>
  );
}

export default BasketItem;
