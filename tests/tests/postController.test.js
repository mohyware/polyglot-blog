const request = require('supertest');
const app = require('../src/app');
const Post = require('../src/models/post');
const ApiError = require('../src/utils/api-error');
const { StatusCodes } = require('http-status-codes');

// Mocking Post model methods
jest.mock('../../server/src/models/post');

describe('Post Controller', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('createPost', () => {
        it('should create a new post and return it with status 201', async () => {
            const postData = { title: 'Test Post', body: 'This is a test post' };
            Post.create.mockResolvedValue(postData); // Mocking successful create

            const response = await request(app).post('/posts').send(postData);
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.post).toEqual(postData);
        });

        it('should return an error if post creation fails', async () => {
            const postData = { title: 'Test Post', body: 'This is a test post' };
            Post.create.mockRejectedValue(new Error('Post creation failed')); // Mocking failure

            const response = await request(app).post('/posts').send(postData);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.body.message).toBe('Post creation failed');
        });
    });

    describe('updatePost', () => {
        it('should update a post and return it with status 200', async () => {
            const postId = '12345';
            const updatedPostData = { title: 'Updated Title', body: 'Updated body' };
            const post = { _id: postId, ...updatedPostData };

            Post.findByIdAndUpdate.mockResolvedValue(post); // Mocking successful update

            const response = await request(app).put(`/posts/${postId}`).send(updatedPostData);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.post).toEqual(post);
        });

        it('should return an error if no post found for update', async () => {
            const postId = '12345';
            const updatedPostData = { title: 'Updated Title', body: 'Updated body' };
            Post.findByIdAndUpdate.mockResolvedValue(null); // Mocking no post found

            const response = await request(app).put(`/posts/${postId}`).send(updatedPostData);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.message).toBe(`No post found with id ${postId}`);
        });
    });

    describe('getPost', () => {
        it('should get a post by ID and return it with status 200', async () => {
            const postId = '12345';
            const post = { _id: postId, title: 'Test Post', body: 'This is a test post' };
            Post.findOne.mockResolvedValue(post); // Mocking found post

            const response = await request(app).get(`/posts/${postId}`);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.post).toEqual(post);
        });

        it('should return an error if no post found by ID', async () => {
            const postId = '12345';
            Post.findOne.mockResolvedValue(null); // Mocking no post found

            const response = await request(app).get(`/posts/${postId}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.message).toBe(`No post found with id ${postId}`);
        });
    });

    describe('summarizePost', () => {
        it('should return a summary of the post body with status 200', async () => {
            const postId = '12345';
            const post = { _id: postId, title: 'Test Post', body: 'This is a test post body.' };
            const summary = 'This is a test post body.'; // Assume summarize works

            Post.findOne.mockResolvedValue(post); // Mocking found post
            jest.spyOn(summarize, 'summarize').mockResolvedValue(summary); // Mock summarize service

            const response = await request(app).get(`/posts/${postId}/summarize`);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.summary).toBe(summary);
        });

        it('should return an error if no post found to summarize', async () => {
            const postId = '12345';
            Post.findOne.mockResolvedValue(null); // Mocking no post found

            const response = await request(app).get(`/posts/${postId}/summarize`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.message).toBe(`No post found with id ${postId}`);
        });
    });

    describe('getAllPosts', () => {
        it('should return all posts with pagination', async () => {
            const posts = [{ title: 'Post 1', body: 'Body 1' }, { title: 'Post 2', body: 'Body 2' }];
            Post.find.mockResolvedValue(posts);
            Post.countDocuments.mockResolvedValue(2); // Mocking total posts count

            const response = await request(app).get('/posts?page=1&limit=2');
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.Posts).toEqual(posts);
            expect(response.body.totalPosts).toBe(2);
        });

        it('should handle query filtering', async () => {
            const posts = [{ title: 'Test Post', body: 'Body' }];
            Post.find.mockResolvedValue(posts);
            Post.countDocuments.mockResolvedValue(1);

            const response = await request(app).get('/posts?query=Test');
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.Posts).toEqual(posts);
            expect(response.body.totalPosts).toBe(1);
        });
    });

    describe('deletePost', () => {
        it('should delete a post and return status 200', async () => {
            const postId = '12345';
            Post.findByIdAndDelete.mockResolvedValue(true); // Mocking post deleted

            const response = await request(app).delete(`/posts/${postId}`);
            expect(response.status).toBe(StatusCodes.OK);
        });

        it('should return an error if no post found to delete', async () => {
            const postId = '12345';
            Post.findByIdAndDelete.mockResolvedValue(null); // Mocking no post found

            const response = await request(app).delete(`/posts/${postId}`);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.message).toBe(`No post found with id ${postId}`);
        });
    });
});
