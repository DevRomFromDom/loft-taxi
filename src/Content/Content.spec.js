import React from "react";
import Content from "./Content";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import {Router} from "react-router-dom"

describe("Content", () => {
    it("renders correctly", async() => {
        let history = createMemoryHistory({ initialEntries: ["/content/map"] });
        let store = {
            getState: ()=>({auth:{token:''}}),
            subscribe: ()=>{},
            dispatch: ()=>{}
        };
     
        let props = {
            match: {
                url: "/content",
            },
        };
        const { container } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Content {...props} />
                </Router>
            </Provider>
        );
        expect(screen.getByTestId("content-container")).toBeDefined();
        expect(history.location.pathname).toBe("/content/map");
        await fireEvent.click(screen.getByTestId("profile-button"));
        expect(history.location.pathname).toBe("/content/profile");
    });
});
