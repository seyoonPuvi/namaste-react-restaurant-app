const { render, screen, fireEvent } = require("@testing-library/react");
const { Provider } = require("react-redux");
const { BrowserRouter } = require("react-router-dom");
const { default: appStore } = require("../utils/appStore/appStore");
import "@testing-library/jest-dom";
import Header from "../components/Header";
import LocationContext from "../utils/locationContext";
import { mockLocationValue } from "./mocks/mockLocationValue";
import { IconBase } from "react-icons";
test("should header component contains image logo", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
});
