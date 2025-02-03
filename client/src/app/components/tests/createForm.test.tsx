import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../createForm";
import { createPost } from "../../lib/actions";
import { useActionState } from "react";

jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useActionState: jest.fn(),
}));

jest.mock("../../lib/actions", () => ({
    createPost: jest.fn(),
}));

describe("Form Component", () => {
    const initialState = { message: null, errors: {} };

    beforeEach(() => {
        useActionState.mockReturnValue([initialState, jest.fn()]);
    });

    it("renders form fields correctly", () => {
        render(<Form />);
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Blog/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Publish post/i })).toBeInTheDocument();
    });

    it("displays validation errors when present", () => {
        const errorState = {
            message: null,
            errors: { title: ["Title is required"], body: ["Body is required"] },
        };
        useActionState.mockReturnValue([errorState, jest.fn()]);

        render(<Form />);
        expect(screen.getByText("Title is required")).toBeInTheDocument();
        expect(screen.getByText("Body is required")).toBeInTheDocument();
    });

    it("submits form data correctly", async () => {
        const formActionMock = jest.fn();
        useActionState.mockReturnValue([initialState, formActionMock]);

        render(<Form />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Title" } });
        fireEvent.change(screen.getByLabelText(/Blog/i), { target: { value: "Test Blog Content" } });
        fireEvent.click(screen.getByRole("button", { name: /Publish post/i }));

        await waitFor(() => {
            expect(formActionMock).toHaveBeenCalled();
        });
    });
});
