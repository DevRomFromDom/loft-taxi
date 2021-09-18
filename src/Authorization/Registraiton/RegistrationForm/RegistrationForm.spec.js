import { Provider } from "react-redux";
import { screen, render, act, fireEvent } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";

describe("RegistrationForm, test", () => {
    it("RegistrationForm renders correctly", async () => {
        const store = {
            getState: jest.fn(),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };

        const props = { regStatus: "error" };
        const wrapper = render(
            <Provider store={store}>
                <RegistrationForm {...props} />
            </Provider>
        );
        expect(screen.getByTestId("reg-btn")).toHaveClass("disabled");
        await act(async () => {
            fireEvent.change(screen.getByTestId("email-label"), {
                target: { value: "testEmail" },
            });
            fireEvent.change(screen.getByTestId("name-label"), {
                target: { value: "testName" },
            });
            fireEvent.change(screen.getByTestId("password-label"), {
                target: { value: "testPassword" },
            });
        });
        expect(screen.getByTestId("reg-btn")).not.toHaveClass("disabled")
    });
});
