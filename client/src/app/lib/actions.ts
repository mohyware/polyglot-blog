'use server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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
    message?: string | null;
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
        };
    }
    const { title, body } = validatedFields.data;
    try {
        const response = await fetch(`http://localhost:4000/api/v1/`, {
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

    } catch (error) {
        console.error(error);
        return {
            message: 'Server Error: Failed to Create Blog.',
        };
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}


export async function updatePost(id: string,
    prevState: State,
    formData: FormData,
) {
    const UpdatePost = FormSchema.omit({ _id: true });
    const validatedFields = UpdatePost.safeParse({
        title: formData.get('title'),
        body: formData.get('body'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Blog.',
        };
    }

    const { title, body } = validatedFields.data;

    try {
        const response = await fetch(`http://localhost:4000/api/v1/${id}`, {
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

    } catch (error) {
        console.error(error);
        return { message: 'Server Error: Failed to Update Blog.' };
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function deletePost(id: string) {
    try {
        const response = await fetch(`http://localhost:4000/api/v1/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
        return { message: 'Server Error: Failed to Delete Blog.' };

    }
}