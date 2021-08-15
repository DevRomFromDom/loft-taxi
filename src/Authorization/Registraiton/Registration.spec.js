import React from "react";
import Registration from "./Registration";
import { render } from "@testing-library/react";

describe("Registration", () => {
    it("reners correctly", async () => {
        const { container, findByTestId } = render(<Registration />);
        expect(container.innerHTML).toMatch("Регистрация")
        expect(await findByTestId("email-label")).toBeDefined()
        expect(await findByTestId("password-label")).toBeDefined()
        expect(await findByTestId("name-label")).toBeDefined()
    });

});
