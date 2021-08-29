import React from "react"
import Content from "./Content"
import {render, fireEvent, screen} from "@testing-library/react"


describe("Content", ()=>{
    it("renders correctly", ()=>{
        const {container} = render(<Content/>) 
        expect(container).toBeTruthy()
        fireEvent.click(screen.getByTestId("profile-button"))
        expect(container.getElementsByClassName('profile__component')).toBeTruthy()
    })
})