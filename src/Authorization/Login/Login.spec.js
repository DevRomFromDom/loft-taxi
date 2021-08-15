import React from "react";
import Login from "./Login";
import { render } from "@testing-library/react";

describe("Login", () => {
    it("reners correctly", async () => {
        const { container, findByTestId } = render(<Login />);
        expect(container.innerHTML).toMatch("Войти")
        expect(await findByTestId("email-label")).toBeDefined()
        expect(await findByTestId("password-label")).toBeDefined()
    });

});
