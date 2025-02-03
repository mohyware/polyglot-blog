import { render, screen } from "@testing-library/react";
import Card from "../postCard"; // Adjust path based on your structure
import { Post } from "@/app/lib/definitions";

jest.mock("../buttons", () => ({
    AdminViewPost: ({ id }: { id: string }) => <button data-testid="view-post">View</button>,
    EditPost: ({ id }: { id: string }) => <button data-testid="edit-post">Edit</button>,
    DeletePost: ({ id }: { id: string }) => <button data-testid="delete-post">Delete</button>,
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

    it("renders admin action buttons", () => {
        render(<Card post={mockPost} />);
        expect(screen.getByTestId("view-post")).toBeInTheDocument();
        expect(screen.getByTestId("edit-post")).toBeInTheDocument();
        expect(screen.getByTestId("delete-post")).toBeInTheDocument();
    });
});
