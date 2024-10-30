import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaLocationDot, FaCartArrowDown } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { LOGO_URL } from "../utils/constants";
import { getLocation } from "../utils/constants";
import LocationContext from "../utils/locationContext";

const Header = () => {
  const [logStatus, setLogStatus] = useState(true);
  const { updateLocation, isLocationActive, setIsLocationActive } =
    useContext(LocationContext);

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const onClickLocation = async () => {
    if (isLocationActive) {
      updateLocation("12.9715987", "77.5945627");
      setIsLocationActive(false);
    } else {
      const myLocation = await getLocation();
      if (myLocation) {
        // Check if myLocation is not null
        setIsLocationActive(true);
        updateLocation(myLocation.latitude, myLocation.longitude);
      } else {
        console.error("Failed to retrieve location.");
      }
    }
  };

  return (
    <div className="header-cont">
      <div className="header-main-cont">
        <div className="left-cont">
          <div className="logo-cont">
            <img src={LOGO_URL} alt="logo" className="logo" />
            <h3 className="name">FooDoo</h3>
          </div>
        </div>

        <ul className="nav-cont">
          <div className="loc-cont" onClick={() => onClickLocation()}>
            <button
              data-testid="locationbtn"
              type="button"
              className={`nav-btn ${
                isLocationActive ? "nav-icon-active" : null
              }`}
            >
              <FaLocationDot />
            </button>
            <span>near me</span>
          </div>
          <Link to="/">
            <li className="nav-items">
              <MdHome /> <span>Home</span>
            </li>
          </Link>
          <Link to="/cart">
            <li className="nav-items">
              <FaCartArrowDown />
              <span className="cart-items-count">{cartItems.length}</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
