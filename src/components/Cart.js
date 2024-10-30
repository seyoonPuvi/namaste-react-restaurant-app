import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../utils/constants";
import { addItem, clearCart, removeItem } from "../utils/appStore/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityAdd = (id) => {
    const updatedCartList = cart.map((each) => {
      if (each.id === id) {
        return { ...each, quantity: each.quantity + 1 };
      }
      return each;
    });
    dispatch(clearCart());
    updatedCartList.forEach((item) => dispatch(addItem(item)));
  };

  const handleRemoveCartItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleQuantityMinus = (id) => {
    const updatedCartList = cart.map((each) => {
      if (each.id === id && each.quantity > 1) {
        return { ...each, quantity: each.quantity - 1 };
      }
      return each;
    });

    dispatch(clearCart());
    updatedCartList.forEach((item) => dispatch(addItem(item)));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-cont">
      <h1 className="title">Cart</h1>
      {cart.length > 0 && (
        <button
          type="button"
          className="log-btn clear-btn"
          onClick={handleClearCart}
        >
          ClearCart
        </button>
      )}
      {cart.length > 0 ? (
        <>
          {cart.map((each) => (
            <div key={each.id} className="cart-main-cont">
              <div className="cart-image-cont">
                {each.cloudinaryImageId && (
                  <img
                    src={IMAGE_URL + each.cloudinaryImageId}
                    alt=""
                    className="cart-res-img"
                  />
                )}
                <div className="cart-res-info">
                  <h3 className="res-name">{each.name}</h3>
                  <p className="cart-res-city">{each.city}</p>
                </div>
              </div>

              <p className="cart-item-name">{each.itemName}</p>
              <span className="quantity-cont">
                <button
                  type="button"
                  className="quantity-minus-btn"
                  onClick={() => handleQuantityMinus(each.id)}
                >
                  -
                </button>{" "}
                <span className="quantity">{each.quantity}</span>
                <button
                  type="button"
                  className="quantity-add-btn"
                  onClick={() => handleQuantityAdd(each.id)}
                >
                  +
                </button>
              </span>
              <p className="price-to-add">
                {(each.quantity * each.priceToAdd) / 100}
              </p>
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveCartItem(each)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total-summary">
            <p className="total">
              Total :{"  "}
              {cart.reduce((acc, curr) => {
                return acc + (curr.quantity * curr.priceToAdd) / 100;
              }, 0)}
            </p>
          </div>
        </>
      ) : (
        <h3 className="no-cart-title">No Cart Items To Show</h3>
      )}
    </div>
  );
};

export default Cart;
