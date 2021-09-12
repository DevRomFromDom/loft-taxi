import React from "react";
import PriceCard from "./PriceCard";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("PriceCard", () => {
    it("reners correctly", async () => {
        const history = createMemoryHistory("./content/map");
        let store = {
            getState: jest.fn(() => ({
                auth: { isLoggedIn: false },
                modal: { modalInfo: { errorMessage: "error" } },
            })),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };

        const props = {
            info: {
                title: "Стандарт",
            },
            car: "Стандарт",
            changeCar: jest.fn(),
        };
        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <PriceCard {...props}/>
                </Router>
            </Provider>
        );
        expect(container.innerHTML).toMatch("Стандарт");
    });
});
