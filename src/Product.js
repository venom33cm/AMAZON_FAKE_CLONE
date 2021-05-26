import React from "react";
import "./Product.css";
import { GetContext } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = GetContext();
  console.log(basket);
  const addingBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product-info">
        <p className="title">{title}</p>
        <div className="product-price">
          <small>₹</small>
          <strong>{price}</strong>
        </div>
        <div className="product-rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img className="product_img" src={image} alt="" />

      <button onClick={addingBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
