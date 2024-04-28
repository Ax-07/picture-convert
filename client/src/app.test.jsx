import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent,act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

describe("renders App component and checks DOM elements", () => {
    beforeEach(() => {
        render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        )});
    test("a header is displayed", () => {
        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();
    });
    
    test("a main is displayed", () => {
        const main = screen.getByTestId("main");
        expect(main).toBeInTheDocument();
    });
    
    test("a footer is displayed", () => {
        const footer = screen.getByTestId("footer");
        expect(footer).toBeInTheDocument();
    });

});

