import React, { useState, useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Body from "./components/Body";
import LocationContext from "./utils/locationContext";
import RestaurantMenu from "./components/RestaurantMenu";
import "../index.css";
import appStore from "./utils/appStore/appStore";
import Cart from "./components/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const [location, setLocation] = useState({
    lattitude: "12.9715987",
    longtitude: "77.5945627",
  });

  const [isLocationActive, setIsLocationActive] = useState(false);

  const updateLocation = (lat, long) => {
    setLocation({ lattitude: lat, longtitude: long });
  };

  return (
    <Provider store={appStore}>
      <LocationContext.Provider
        value={{
          lattitude: location.lattitude,
          longtitude: location.longtitude,
          updateLocation,
          isLocationActive,
          setIsLocationActive,
        }}
      >
        <div className="app-cont">
          <Header />
          <Outlet />
        </div>
      </LocationContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/:resId", element: <RestaurantMenu /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
  ,
  ,
]);

root.render(<RouterProvider router={appRouter} />);
