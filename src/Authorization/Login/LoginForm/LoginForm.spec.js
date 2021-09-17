import LoginForm from "./LoginForm";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

describe("loginform test", () => {
    it("login form render correct", async () => {
        const store = {
            getState: jest.fn(),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };
        const props = { regStatus: { type: "success" } };
        const wrapper = render(
            <Provider store={store}>
                <LoginForm {...props} />
            </Provider>
        );
        expect(screen.getByTestId("login-btn")).toHaveClass("disabled btn");
        await act(async () => {
            fireEvent.change(screen.getByTestId("email-label"), {
                target: { value: "testemail" },
            });
            fireEvent.change(screen.getByTestId("password-label"), {
                target: { value: "testpassword" },
            });
        });
        expect(screen.getByTestId("login-btn")).not.toHaveClass("disabled");
    });
});
