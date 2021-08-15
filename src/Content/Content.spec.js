import React from "react"
import Content from "./Content"
import {render} from "@testing-library/react"


describe("Content", ()=>{
    it("renders correctly", ()=>{
        const {container} = render(<Content/>)
    })
})