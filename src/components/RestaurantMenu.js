import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { MdStars } from "react-icons/md";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import LocationContext from "../utils/locationContext";
import ShimmerAccordian from "./ShimmerAccordian";
import { IMAGE_URL } from "../utils/constants";
import Accordian from "./Accordian";

const RestaurantMenu = () => {
  const [resInfoList, setResInfoList] = useState([]);
  const [resDetails, setResDetails] = useState({});
  const { lattitude, longtitude } = useContext(LocationContext);
  const { resId } = useParams();
  const { data } = useRestaurantMenu(resId, lattitude, longtitude);

  useEffect(() => {
    // Only update if filteredResInfoList is not empty
    if (data.filteredResInfoList !== null) {
      setResInfoList(data.filteredResInfoList);
    }
  }, [data]); // Run this effect when data changes

  useEffect(() => {
    if (data.resSummary !== null) {
      setResDetails(data.resSummary);
    }
  }, [data]); // Run this effect when data changes

  const onRenderResDetails = (resDetails) => {
    const {
      name,
      avgRating,
      sla,
      totalRatingsString,
      costForTwoMessage,
      city,
      areaName,
      cloudinaryImageId,
    } = resDetails;
    return (
      <div className="restaurant-menu-main-cont">
        <div className="restaurant-menu">
          <h1 className="res-menu-name">{name}</h1>
          <div className="res-menu-rating-and-time-cont">
            <div className="rating-cont">
              <MdStars className="res-menu-star-icon" />
              <p className="res-menu-rating">
                {avgRating} {`(${totalRatingsString})`}
              </p>
            </div>
            <p className="res-menu-rating">. {costForTwoMessage}</p>
          </div>
          <p className="res-menu-time">{sla.slaString}</p>
          <p className="res-menu-time">
            {areaName} , {city}
          </p>
        </div>
        <div className="res-menu-img-card">
          <img
            src={IMAGE_URL + cloudinaryImageId}
            alt="res image"
            className="res-menu-img"
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      {resInfoList.length > 0 ? (
        <div className="restaurant-menu-cont">
          {onRenderResDetails(resDetails)}
          <p className="sub-title">MENU</p>
          <Accordian resInfoList={resInfoList} resDetails={resDetails} />
        </div>
      ) : (
        <ShimmerAccordian />
      )}
    </div>
  );
};

export default RestaurantMenu;
