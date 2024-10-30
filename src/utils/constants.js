export const LOGO_URL = "https://i.postimg.cc/76TPm3kX/burger.png";

export const fetchRestaurantListApi_URL =
  "https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?";

export const IMAGE_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const fetchRestaurantMenu_Api_URL =
  "https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&";

export const getLocation = async () => {
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
    return null; // Return null if geolocation is not supported
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    handleGeolocationError(error);
    return null; // Return null in case of an error
  }
};

const handleGeolocationError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User  denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    default:
      console.log("An unknown error occurred.");
      break;
  }
};
