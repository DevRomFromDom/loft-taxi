import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

let history = createMemoryHistory({ initialEntries: ["/"] });
describe("App", () => {
    it("renders correctly", () => {
        let store = {
            getState: () => ({ auth: { isLoggedIn: false }, modal:{modalInfo:{text:'', type:''}} }),
            subscribe: () => {},
            dispatch: () => {},
        };

        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("login-component")).toHaveTextContent(
            "Войти"
        );
    });
});
