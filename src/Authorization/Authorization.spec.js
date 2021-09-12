import React from "react";
import Authorization from "./Authorization";
import { render, screen, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";

let history = createMemoryHistory({ initialEntries: ["/auth/login"] });
describe("Authorization", () => {
    it("renders correctly", async () => {
        let store = {
            getState: () => ({
                auth: { isLoggedIn: false },
                modal: { modalInfo: { errorMessage: "error" } } 
            }),
            subscribe: () => {},
            dispatch: () => {},
        };
        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Authorization />
                </Router>
            </Provider>
        );
        expect(container.getElementsByClassName(".title")).toBeDefined();
        expect(history.location.pathname).toBe("/auth/login");
        await fireEvent.click(screen.getByText("Регистрация"));
        expect(history.location.pathname).toBe("/auth/registration");
    });
});
