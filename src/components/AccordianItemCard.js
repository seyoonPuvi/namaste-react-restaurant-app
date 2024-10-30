import React, { useState } from "react";
import { MdStars } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { IMAGE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import cartSlice from "../utils/appStore/cartSlice";
import { addItem } from "../utils/appStore/cartSlice";

const AccordianItemCard = (props) => {
  const [isAddBtnClicked, setAddBtnClick] = useState(false);
  const { itemCard, resDetails } = props;

  const { itemAttribute, name, offerTags, ratings, description, imageId } =
    itemCard.card.info;

  const dispatch = useDispatch();
  const itemCards = useSelector((store) => store.cart.items);

  const onRenderCategory = () => {
    const { vegClassifier } = itemAttribute;

    return (
      <div
        className={`category-cont ${
          vegClassifier === "VEG" ? "veg-category" : null
        }`}
      >
        <p className={`dot ${vegClassifier === "VEG" ? "veg-dot" : null}`}></p>
      </div>
    );
  };

  const onRenderPrice = () => {
    const { defaultPrice, finalPrice, price } = itemCard.card.info;

    if (finalPrice && (price || defaultPrice)) {
      return (
        <div className="price-cont">
          <span className="price">₹ {price / 100 || defaultPrice / 100}</span>
          <span className="discount">₹ {finalPrice / 100}</span>
        </div>
      );
    } else {
      return (
        <span className="discount">
          ₹ {defaultPrice ? defaultPrice / 100 : price / 100}
        </span>
      );
    }
  };

  const onRenderOffer = () => {
    if (offerTags) {
      const offer = offerTags[0];
      const { title, subTitle } = offer;
      if (title && subTitle) {
        return (
          <div className="offer-cont">
            <CiShoppingTag className="tag-icon" />
            <span className="offer-title">{title}</span>
            <span className="offer-subtitle">{subTitle}</span>
          </div>
        );
      }
    }
    return null;
  };

  const onRenderRating = () => {
    const { rating, ratingCount } = ratings.aggregatedRating;
    if (rating) {
      return (
        <div className="rating-cont">
          <MdStars className="res-menu-star-icon" />
          <p className="res-menu-rating">
            {rating} {`(${ratingCount ? ratingCount : ""})`}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleAddItems = () => {
    const { name, city, cloudinaryImageId } = resDetails;
    const { price, defaultPrice, finalPrice, id } = itemCard.card.info;
    // Find the selected cart item
    const selectedCartItem = itemCards.find((each) => each.id === id);

    // Determine the price to add
    let priceToAdd = finalPrice || price || defaultPrice;

    // Create the updated cart item object
    let updatedCartItemToAdd = {
      name,
      id,
      city,
      priceToAdd,
      itemName: itemCard.card.info.name,
      quantity: 1, // Default quantity
      cloudinaryImageId,
    };

    // Add the item to the cart If the item is not already in the cart,
    if (!selectedCartItem) {
      dispatch(addItem(updatedCartItemToAdd));
      setAddBtnClick(true);
    } else {
      alert(
        "Item already exists in the cart ,check and modify the items in the cart"
      );
    }

    //
  };

  return (
    <li className="item-card-cont">
      <div className="item-card">
        {onRenderCategory()}
        <h3 className="item-name">{name}</h3>
        <div className="price-offer-cont">
          {onRenderPrice()}
          {onRenderOffer()}
        </div>
        {onRenderRating()}

        {description && description.length > 120 ? (
          <p className="item-desc">
            {description.slice(0, 120)}
            <span className="more-text">...more</span>
          </p>
        ) : (
          description && <p className="item-desc">{description}</p>
        )}
      </div>
      <div className="item-image-cont">
        {imageId && (
          <img src={IMAGE_URL + imageId} alt="" className="item-img" />
        )}
        <button
          className={imageId ? "add-btn active" : "add-btn"}
          onClick={() => handleAddItems()}
        >
          {isAddBtnClicked ? "added" : "add"}
        </button>
      </div>
    </li>
  );
};

export default AccordianItemCard;
