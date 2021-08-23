import React from "react";
import Authorization from "./Authorization";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Authorization", () => {
    
    it("renders correctly", () => {
       
        const { container } = render(<Authorization />);
        expect(screen.getByTestId("reg-link")).toHaveTextContent("Регистрация")
        fireEvent.click(screen.getByText('Регистрация'))
        expect(screen.getByTestId("login-link")).toHaveTextContent('Войти?')

        
    });
});
