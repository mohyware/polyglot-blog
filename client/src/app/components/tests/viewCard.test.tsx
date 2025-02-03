import { render, screen } from "@testing-library/react";
import Card from "../viewCard"; // Adjust the path based on your folder structure
import { Post } from "@/app/lib/definitions";

// Mocking imported components
jest.mock("../buttons", () => ({
    ViewPost: ({ id }: { id: string }) => <button data-testid="view-post">View</button>,
}));
jest.mock("../SummarizeButton", () => ({
    __esModule: true,
    default: ({ id, title }: { id: string; title: string }) => (
        <button data-testid="summarize-button">Summarize</button>
    ),
}));

describe("Card Component", () => {
    const mockPost: Post = {
        _id: "123",
        title: "Test Post Title",
        body: "This is a sample post body. It has multiple sentences. Here is another one.",
    };

    it("renders post title", () => {
        render(<Card post={mockPost} />);
        expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    });

    it("renders post preview text", () => {
        render(<Card post={mockPost} />);
        expect(
            screen.getByText("This is a sample post body. It has multiple sentences...")
        ).toBeInTheDocument();
    });

    it("renders ViewPost and SummarizeButton", () => {
        render(<Card post={mockPost} />);
        expect(screen.getByTestId("view-post")).toBeInTheDocument();
        expect(screen.getByTestId("summarize-button")).toBeInTheDocument();
    });
});