import React, { useEffect, useContext, useState } from "react";
import { fetchRestaurantMenu_Api_URL } from "./constants";

const useRestaurantMenu = (resId, lat, long) => {
  const [data, setData] = useState({
    filteredResInfoList: null,
    resSummary: null,
  });

  useEffect(() => {
    fetchResData();
  }, []);

  const fetchResData = async () => {
    const url =
      fetchRestaurantMenu_Api_URL +
      "lat=" +
      lat +
      "&lng=" +
      long +
      "&restaurantId=" +
      resId;
    const response = await fetch(url);
    const json = await response.json();
    const resSummary = json.data.cards[2].card.card.info;
    const resInfo = json.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;
    const filteredResInfoList = resInfo
      .map((each) => {
        if (
          each.card.card["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          return {
            itemCards: each.card.card.itemCards,
            cardTitle: each.card.card.title,
          };
        } else {
          return null;
        }
      })
      .filter((eachItem) => eachItem !== null);

    setData({ filteredResInfoList, resSummary });
  };

  return { data };
};

export default useRestaurantMenu;
