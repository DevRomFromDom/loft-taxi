import React from "react";
import Profile from "./Profile";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("Profile", () => {
    it("renders correctly", async () => {
        const history = createMemoryHistory({
            initialEntries: ["/content/profile"],
        });
        let store = {
            getState: () => ({auth:{token:''}, card: {id:""}}),
            subscribe: () => {},
            dispatch: () => {},
        };
        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Profile />
                </Router>
            </Provider>
        );
        expect(history.location.pathname).toBe("/content/profile");
        expect(screen.getByText("Ввдеите платежные данные")).toBeDefined();
    });
});
