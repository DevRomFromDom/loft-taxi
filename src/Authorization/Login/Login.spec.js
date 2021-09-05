import React from "react";
import Login from "./Login";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("Login", () => {
    it("reners correctly", async () => {
        const history = createMemoryHistory();
        let store = {
            getState: jest.fn(),
            subscribe: jest.fn(),
        };
        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Login />
                </Router>
            </Provider>
        );
        expect(container.innerHTML).toMatch("Войти");
        expect(screen.getByTestId("reg-link")).toBeDefined()
    });
});
