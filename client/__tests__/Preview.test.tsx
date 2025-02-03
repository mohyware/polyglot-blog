/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Preview from "../src/app/page";

describe("Home", () => {
    it("renders a heading", () => {
        render(<Preview />);

        const myElem = screen.getByText(/Polyglot/i) // ACT 

        expect(myElem).toBeInTheDocument() // ASSERT
    });
});

