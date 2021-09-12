import React from "react";
import Map from "./Map";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import mapboxgl from "mapbox-gl";

jest.mock("mapbox-gl", () => ({
    Map:class Map{
        on (){}
        mockReturnValueOnce(){}
        remove(){}
    }
}));

describe("Map", () => {
    it("renders correctly", () => {
        let history = createMemoryHistory({ initialEntries: ["/content/map"] });
        let store = {
            getState: () => ({
                addresses: { route: [], addresses: [] },
                card: { cardName: "123123" },
            }),
            subscribe: () => {},
            dispatch: () => {},
        };

        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Map />
                </Router>
            </Provider>
        );
        expect(screen.getByText("Заказать")).toBeDefined();
        expect(history.location.pathname).toBe("/content/map");
    });
});
