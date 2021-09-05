import React from "react";
import Registration from "./Registration";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
const logIn = jest.fn();

describe("Registration", () => {
    it("renders correctly", async () => {
        const history = createMemoryHistory();
        let store = {
            getState: jest.fn(),
            subscribe: jest.fn(),
        };
        const { container, findByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Registration  />
                </Router>
            </Provider>
        );
        expect(container.innerHTML).toMatch("Регистрация");
        expect(await findByTestId("email-label")).toBeDefined();
        expect(await findByTestId("password-label")).toBeDefined();
        expect(await findByTestId("name-label")).toBeDefined();
    });
});
