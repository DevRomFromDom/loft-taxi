import ModalInfo from "./ModalInfo";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

describe("ModalInfo", () => {
    it("renders correctly", async () => {
        let store = {
            getState: () => ({
                modal: {
                    modalInfo: {
                        text: "Error",
                        type: "error",
                    },
                    show: true,
                },
            }),
            subscribe: () => {},
            dispatch: () => {},
        };
        const { container } = render(
            <Provider store={store}>
                <ModalInfo />
            </Provider>
        );

        expect(screen.getByText("Error")).toBeDefined()
        expect(screen.getByTestId("modalInfo-container")).toHaveClass("error")
    });
});
