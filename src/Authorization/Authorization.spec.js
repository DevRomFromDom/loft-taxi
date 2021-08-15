import React from "react"
import Authorization from "./Authorization"
import {render} from "@testing-library/react"


describe("Authorization", ()=>{
    it("renders correctly", ()=>{
        const {container} = render(<Authorization/>)
        expect(container.innerHTML).toMatch("taxi")
    })
})