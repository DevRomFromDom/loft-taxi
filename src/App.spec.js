import React from "react";
import App from "./App";
import { render } from "@testing-library/react";


describe("App", () => {
    it("renders correctly", () => {
        const { container } = render(<App />);
        expect(container).toBeTruthy();
    });
});
