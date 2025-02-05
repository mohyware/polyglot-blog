
export type Post = {
    _id: string;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
};

export interface PostAddModel {
    title: string,
    body: string
}