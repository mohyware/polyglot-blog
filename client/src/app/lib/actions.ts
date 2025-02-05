'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
const baseUrl = process.env.API_URL;

// Use Zod to update the expected types
const FormSchema = z.object({
    _id: z.string(),
    title: z.string().min(1, 'Title cannot be empty'),
    body: z.string().min(1, 'Body cannot be empty'),
});
export type State = {
    errors?: {
        title?: string[];
        body?: string[];
    };
    message: string;
    success: boolean;
};

export async function createPost(prevState: State, formData: FormData) {
    const CreatePost = FormSchema.omit({ _id: true });
    const validatedFields = CreatePost.safeParse({
        title: formData.get('title'),
        body: formData.get('body'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Blog.',
            success: false,
        };
    }
    const { title, body } = validatedFields.data;
    try {
        const response = await fetch(`${baseUrl}/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        return {
            message: 'Your post has been created successfully!',
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: 'Server Error: Failed to Create Blog.',
            success: false,
        };
    }
}


export async function updatePost(id: string, prevState: State, formData: FormData) {
    const UpdatePost = FormSchema.omit({ _id: true });
    const validatedFields = UpdatePost.safeParse({
        title: formData.get('title'),
        body: formData.get('body'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Blog.',
            success: false,
        };
    }

    const { title, body } = validatedFields.data;

    try {
        const response = await fetch(`${baseUrl}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        revalidatePath('/blog');
        revalidatePath('/admin/blog');
        // Return success message on successful update
        return {
            message: 'Post updated successfully',
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: 'Server Error: Failed to Update Blog.',
            success: false
        };
    }
}

export async function deletePost(id: string) {
    try {
        const response = await fetch(`${baseUrl}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return {
            message: 'Post deleted successfully',
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: 'Server Error: Failed to Delete Blog.',
            success: false
        };
    }
}

export async function updateServer() {
    revalidatePath('/blog');
    revalidatePath('/admin/blog');
}