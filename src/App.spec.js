import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";


describe("App", () => {
    it("renders correctly", () => {
        const { rerender } = render(<App isLoggedIn={false}/>);
        expect(screen.getByTestId("login-component")).toHaveTextContent("Войти");
        rerender(<App isLoggedIn={true}/>)
        expect(screen.getByTestId("content-container")).toHaveTextContent("Карта");
    });
});
