import React from "react"
import Content from "./Content"
import {render, fireEvent} from "@testing-library/react"


describe("Content", ()=>{
    it("renders correctly", ()=>{
        const {container} = render(<Content/>) 
        expect(container.getByText('Карта')).toBe(true)
        fireEvent.click(container.getByTestId("profile-button"))
        expect(container.getByText('Профиль')).toBe(true)
    })
})