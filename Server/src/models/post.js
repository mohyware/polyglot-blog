import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide Title'],
            maxlength: 50,
        },
        body: {
            type: String,
            required: [true, 'Please provide Body'],
            maxlength: 500,
        },
        createdBy: {
            type: String,
            required: [false, 'Please provide user'],
            maxlength: 10,
        },
    },
    { timestamps: true }
)

export default model('Post', PostSchema);