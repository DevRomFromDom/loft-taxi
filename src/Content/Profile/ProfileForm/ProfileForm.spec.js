import ProfileForm from "./ProfileForm";
import { act, screen, render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

describe("ProfileForm test", () => {
    const store = {
        getState: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    };
    const props = {
        card: {},
        token: "d4erwtoken",
        closeForm: false,
    };
    const wrapper = render(
        <Provider store={store}>
            <ProfileForm {...props} />
        </Provider>
    );
    it("ProfileForm renders correctly", async () => {
        expect(screen.getByTestId("card-btn")).toHaveClass("disabled");
    });
    it("card fields full and can submit", async () => {
        const props = {
            card: {
                cardName: "testName",
                cardNumber: "9999 9999 9999 9999",
                expiryDate: "12/12",
                cvc: "123",
                id: "1dfsdf2354",
            },
            token: "d4erwtoken",
            closeForm: false,
        };

        const wrapper = render(
            <Provider store={store}>
                <ProfileForm {...props} />
            </Provider>
        );
        await act(async () => {
            fireEvent.change(screen.getByTestId("name-field"), {
                target: { value: "testName" },
            });
            fireEvent.change(screen.getByTestId("number-field"), {
                target: { value: "9999 9999 9999 9999" },
            });
            fireEvent.change(screen.getByTestId("date-field"), {
                target: { value: "12/12" },
            });
            fireEvent.change(screen.getByTestId("cvc-field"), {
                target: { value: "123" },
            });
        });
        expect(screen.getByTestId("card-btn")).not.toHaveClass("disabled");
    });
});
