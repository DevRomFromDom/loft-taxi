import React from "react";
import MapOrderForm from "./MapOrderForm";
import { render, fireEvent, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("MapOrderForm", () => {
    it("reners correctly", async () => {
        const history = createMemoryHistory("./content/map");
        let store = {
            getState: jest.fn(() => ({
                auth: { isLoggedIn: false },
                modal: { modalInfo: { errorMessage: "error" } },
                addresses: { addresses: ["Эрмитаж", "Пулково"], route: [] },
            })),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };

        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <MapOrderForm />
                </Router>
            </Provider>
        );
        expect(container.innerHTML).toMatch("Заказать");
        expect(screen.getByTestId("btn-test")).toHaveClass("disabled");
        await act(async () => {
            fireEvent.change(screen.getByTestId("start-id"), {
                target: { value: "Эрмитаж" },
            });
            fireEvent.change(screen.getByTestId("end-id"), {
                target: { value: "Пулково" },
            });
        });
        expect(screen.getByTestId("btn-test")).not.toHaveClass("disabled");
    });
});
