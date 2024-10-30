import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import RestaurantCard from "./RestaurantCard";
import { fetchRestaurantListApi_URL } from "../utils/constants";
import LocationContext from "../utils/locationContext";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredResList, setFilteredResList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBtnClicked, toggleSortBtn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { lattitude, longtitude, isLocationActive } =
    useContext(LocationContext);

  useEffect(() => {
    fetchResList();
  }, [lattitude, longtitude]);

  const fetchResList = async () => {
    setLoading(true);
    setFilteredResList([]);
    const res = await fetch(
      fetchRestaurantListApi_URL + `lat=${lattitude}&lng=${longtitude}`
    );
    const jsonData = await res.json();
    console.log(jsonData);
    const resList =
      jsonData.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
    setRestaurantList(resList);
    setFilteredResList(resList);
    setLoading(false);
  };

  const onSearchInput = () => {
    const updatedResList = restaurantList.filter((each) =>
      each.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredResList(updatedResList);
  };

  const onSortRatings = () => {
    if (sortBtnClicked) {
      setFilteredResList(restaurantList);
    } else {
      const updatedResList = restaurantList.filter(
        (each) => each.info.avgRating >= 4.0
      );
      setFilteredResList(updatedResList);
    }

    toggleSortBtn((prev) => !prev);
  };

  return (
    <div className="body-cont">
      <div className="filter-cont">
        <div className="search-cont">
          <input
            type="text"
            className="search-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button type="button" className="search-btn" onClick={onSearchInput}>
            Search
          </button>
        </div>
        <button
          type="button"
          className={`sort-by-btn ${sortBtnClicked ? "sort-btn-active" : null}`}
          onClick={onSortRatings}
        >
          Ratings 4.0+
        </button>
      </div>
      <h1 className="res-card-cont-heading">
        Restaurants near {isLocationActive ? "you" : "bangalore"}
      </h1>
      <ul className="res-card-cont">
        {filteredResList.length > 0
          ? filteredResList.map((eachRes) => (
              <Link to={`/${eachRes.info.id}`} key={eachRes.info.id}>
                <RestaurantCard resDetails={eachRes.info} />
              </Link>
            ))
          : isLoading && <Shimmer />}
      </ul>
      {filteredResList.length === 0 && isLoading === false ? (
        <h3 className="no-cart-title">No Cart Items To Show</h3>
      ) : null}
    </div>
  );
};

export default Body;
