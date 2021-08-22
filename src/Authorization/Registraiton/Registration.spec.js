import React from "react";
import Registration from "./Registration";
import { render } from "@testing-library/react";
const logIn = jest.fn();
const AppContext = React.createContext()

describe("Registration", () => {
   
    it("renders correctly", async () => {
        const { container, findByTestId } = render(
            <AppContext.Provider  value={logIn}>
                <Registration />
            </AppContext.Provider>
        );
        expect(container.innerHTML).toMatch("Регистрация");
        expect(await findByTestId("email-label")).toBeDefined();
        expect(await findByTestId("password-label")).toBeDefined();
        expect(await findByTestId("name-label")).toBeDefined();
    });
});
