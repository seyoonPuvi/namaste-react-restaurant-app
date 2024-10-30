import React from "react";
import { MdStars } from "react-icons/md";
import { IMAGE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resDetails } = props;
  const {
    name,
    cloudinaryImageId,
    cuisines,
    costForTwo,
    avgRating,
    sla,
    areaName,
    aggregatedDiscountInfoV3,
  } = resDetails;

  return (
    <li className="res-card">
      <div className="img-card">
        <img
          src={IMAGE_URL + cloudinaryImageId}
          alt="res-img"
          className="res-img"
        />
        <div className="offer-card">
          <h3 className="abt-offer">
            {aggregatedDiscountInfoV3 !== undefined
              ? aggregatedDiscountInfoV3.header
              : ""}{" "}
            {aggregatedDiscountInfoV3 !== undefined
              ? aggregatedDiscountInfoV3.subHeader
              : ""}
          </h3>
        </div>
      </div>

      <div className="res-info-cont">
        <h2 className="res-name">{name}</h2>
        <div className="rating-and-time-cont">
          <div className="rating-cont">
            <MdStars className="star-icon" />
            <p className="rating">{avgRating} .</p>
          </div>
          <p className="time">{sla.slaString}</p>
        </div>
        <p className="time">{costForTwo}</p>
        <p className="cusines-name">{cuisines.join("' ")}</p>
        <p className="res-location">{areaName}</p>
      </div>
    </li>
  );
};

export default RestaurantCard;
