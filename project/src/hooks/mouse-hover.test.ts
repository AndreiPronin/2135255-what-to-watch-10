import { useMouseHover } from "./mouse-hover";
import userEvent from '@testing-library/user-event'
import {render, screen} from '@testing-library/react';
import React from "react";

describe("when rendered", () => {
  it("returns current initial value, uppercased", () => {
    const { activVideo,MouseOut,MouseOver } = useMouseHover();
    MouseOut(React.DOMAttributes<HTMLElement>.onMouseOut)

    expect(activVideo).toEqual("10");
  })
})