import { render, screen } from "@testing-library/react";
import { FlyOutPanel } from "./FlyOutPanel";
import { Provider } from "react-redux";
// import { store } from "../store/store";
import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../store/itemsSlice";

const store = configureStore({
  reducer: { items: itemsReducer },
  preloadedState: { items: [] },
});

describe("FlyOutPanel component without data", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <FlyOutPanel />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("rendered main blocks", () => {
    render(
      <Provider store={store}>
        <FlyOutPanel />
      </Provider>,
    );
    expect(screen.queryByTestId("flyOutPanel-wrapper")).not.toBeInTheDocument();
  });
});

const storeWithData = configureStore({
  reducer: { items: itemsReducer },
  preloadedState: {
    items: [
      {
        uid: "CHMA0000280385",
        name: "A. Armaganian",
        gender: null,
        yearOfBirth: null,
        monthOfBirth: null,
        dayOfBirth: null,
        placeOfBirth: null,
        yearOfDeath: null,
        monthOfDeath: null,
        dayOfDeath: null,
        placeOfDeath: null,
        height: null,
        weight: null,
        deceased: null,
        bloodType: null,
        maritalStatus: null,
        serialNumber: null,
        hologramActivationDate: null,
        hologramStatus: null,
        hologramDateStatus: null,
        hologram: false,
        fictionalCharacter: false,
        mirror: false,
        alternateReality: false,
      },
      {
        uid: "CHMA0000026532",
        name: "A'trom",
        gender: null,
        yearOfBirth: null,
        monthOfBirth: null,
        dayOfBirth: null,
        placeOfBirth: null,
        yearOfDeath: null,
        monthOfDeath: null,
        dayOfDeath: null,
        placeOfDeath: null,
        height: null,
        weight: null,
        deceased: null,
        bloodType: null,
        maritalStatus: null,
        serialNumber: null,
        hologramActivationDate: null,
        hologramStatus: null,
        hologramDateStatus: null,
        hologram: false,
        fictionalCharacter: false,
        mirror: false,
        alternateReality: false,
      },
    ],
  },
});

describe("FlyOutPanel component with data", () => {
  it("snapshot of component", () => {
    const { asFragment } = render(
      <Provider store={storeWithData}>
        <FlyOutPanel />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("rendered main blocks", () => {
    render(
      <Provider store={storeWithData}>
        <FlyOutPanel />
      </Provider>,
    );
    expect(screen.queryByTestId("flyOutPanel-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("flyOutPanel-countItems")).toHaveTextContent(
      /2/i,
    );
  });
});
