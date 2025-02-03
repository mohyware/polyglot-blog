const request = require('supertest');
const app = require('../src/app');
const Post = require('../src/models/post');
const { StatusCodes } = require('http-status-codes');
require('dotenv').config();

// Mocking Post model methods
jest.mock('../src/models/post');

describe('Post Controller', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    describe('createPost', () => {
        it('should create a new post and return it with status 201', async () => {
            const postData = { title: 'Test Post', body: 'This is a test post' };
            Post.create.mockResolvedValue(postData);

            const response = await request(app).post('/api/posts').send(postData);
            expect(response.status).toBe(StatusCodes.CREATED);
            expect(response.body.post).toEqual(postData);
        });

        it('should return an error when the title is missing', async () => {
            const postData = { body: 'This is a test post' };
            Post.create.mockResolvedValue(postData);

            const response = await request(app).post('/api/posts').send(postData);
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errors).toHaveProperty('title', 'Please provide Title');
        });

        it('should return an error when the body is missing', async () => {
            const postData = { title: 'Test post' };
            Post.create.mockResolvedValue(postData);

            const response = await request(app).post('/api/posts').send(postData);
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errors).toHaveProperty('body', 'Please provide Body');
        });

        it('should return an error if post creation fails', async () => {
            const postData = { title: 'Test Post', body: 'This is a test post' };
            Post.create.mockRejectedValue(new Error('Post creation failed'));
            const response = await request(app).post('/api/posts').send(postData);
            expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
            expect(response.body.error).toBe('Post creation failed');
        });
    });

    describe('updatePost', () => {
        it('should update a post and return it with status 200', async () => {
            const postId = '12345';
            const updatedPostData = { title: 'Updated Title', body: 'Updated body' };
            const post = { _id: postId, ...updatedPostData };

            Post.findByIdAndUpdate.mockResolvedValue(post);

            const response = await request(app).patch(`/api/posts/${postId}`).send(updatedPostData);
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.post).toEqual(post);
        });

        it('should return an error when the title is missing', async () => {
            const postId = '12345';
            const updatedPostData = { body: 'Updated body' };
            const post = { _id: postId, ...updatedPostData };

            Post.findByIdAndUpdate.mockResolvedValue(post);

            const response = await request(app).patch(`/api/posts/${postId}`).send(updatedPostData);
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errors).toHaveProperty('title', 'Please provide Title');
        });

        it('should return an error when the body is missing', async () => {
            const postId = '12345';
            const updatedPostData = { title: 'Updated Title' };
            const post = { _id: postId, ...updatedPostData };

            Post.findByIdAndUpdate.mockResolvedValue(post);

            const response = await request(app).patch(`/api/posts/${postId}`).send(updatedPostData);
            expect(response.status).toBe(StatusCodes.BAD_REQUEST);
            expect(response.body.errors).toHaveProperty('body', 'Please provide Body');
        });

        it('should return an error if no post found for update', async () => {
            const postId = '12345';
            const updatedPostData = { title: 'Updated Title', body: 'Updated body' };
            Post.findByIdAndUpdate.mockResolvedValue(null);

            const response = await request(app).patch(`/api/posts/${postId}`).send(updatedPostData);
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.error).toBe(`No post found with id ${postId}`);
        });
    });

    describe('getPost', () => {
        it('should get a post by ID and return it with status 200', async () => {
            const postId = '12345';
            const post = { _id: postId, title: 'Test Post', body: 'This is a test post' };
            Post.findOne.mockResolvedValue(post);

            const response = await request(app).get(`/api/posts/${postId}`);
            expect(Post.findOne).toHaveBeenCalledWith({ _id: postId });

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.post).toEqual(post);
        });

        it('should return an error if no post found by ID', async () => {
            const postId = '12345';
            Post.findOne.mockResolvedValue(null);

            const response = await request(app).get(`/api/posts/${postId}`);
            expect(Post.findOne).toHaveBeenCalledWith({ _id: postId });

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.error).toBe(`No post found with id ${postId}`);
        });
    });

    describe('summarizePost', () => {
        const { summarize } = require('../src/services/summarize');

        jest.mock('../src/services/summarize', () => ({
            summarize: jest.fn()
        }));

        it('should return a summary of the post body with status 200', async () => {
            const postId = '12345';
            const post = { _id: postId, title: 'Test Post', body: 'This is a test post body.' };
            const summary = 'This is a summarized test post body.';

            // Mock the summarize service
            const mockSummary = require('../src/services/summarize').summarize;
            mockSummary.mockReturnValue(summary);
            // Mocking found post
            Post.findOne.mockResolvedValue(post);
            const response = await request(app).get(`/api/posts/summary/${postId}`);

            expect(Post.findOne).toHaveBeenCalledWith({ _id: postId });
            expect(summarize).toHaveBeenCalledWith(post.body);

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body.summary).toBe(summary);
        });

        it('should return 404 if post is not found', async () => {
            const invalidPostId = '64d5e8f9b4a1bb001c8e4d1b';

            // Mock Post.findOne to return null (post not found)
            Post.findOne.mockResolvedValue(null);

            const res = await request(app)
                .get(`/api/posts/summary/${invalidPostId}`)
                .expect(StatusCodes.NOT_FOUND);

            // Assertions
            expect(res.body.error).toBe(`No post found with id ${invalidPostId}`);
            expect(Post.findOne).toHaveBeenCalledWith({ _id: invalidPostId });
        });

        it('should handle summarize function (that load python) errors', async () => {
            const mockPost = {
                _id: '132',
                body: 'This is a long post that needs to be summarized.',
            };

            // Mock Post.findOne to return a valid post
            Post.findOne.mockResolvedValue(mockPost);
            // Mock the summarize function to throw an error
            const mockError = new Error('Summarization failed');
            const mockSummarize = require('../src/services/summarize').summarize;
            mockSummarize.mockRejectedValueOnce(mockError);

            const res = await request(app).get(`/api/posts/summary/${mockPost._id}`)
            expect(Post.findOne).toHaveBeenCalledWith({ _id: mockPost._id });
            expect(summarize).toHaveBeenCalledWith(mockPost.body);

            // Assertions
            expect(mockSummarize).toHaveBeenCalledWith(mockPost.body);
            expect(res.body).toHaveProperty('message', 'Summarization failed');
            expect(Post.findOne).toHaveBeenCalledWith({ _id: mockPost._id });
        });
    });

    describe('getAllPosts', () => {
        it('should return all posts with pagination', async () => {
            const mockPosts = [{ title: "Post 1", body: "Body 1" }, { title: "Post 2", body: "Body 2" }];
            // Mock the Mongoose query methods
            const mockQuery = {
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockPosts),
            };
            Post.find.mockReturnValue(mockQuery);
            Post.countDocuments.mockResolvedValue(2);

            const response = await request(app).get("/api/posts?limit=1&page=1");

            expect(Post.find).toHaveBeenCalledWith({});
            expect(Post.countDocuments).toHaveBeenCalledWith({});

            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body).toEqual({
                Posts: mockPosts,
                count: mockPosts.length,
                totalPosts: 2,
                totalPages: 2,
                currentPage: 1,
            });
        });

        it('should handle query filtering', async () => {
            const mockPosts = [{ title: 'Test Post', body: 'Body' }];
            // Mock the Mongoose query methods
            const mockQuery = {
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockPosts),
            };
            Post.find.mockReturnValue(mockQuery);
            Post.countDocuments.mockResolvedValue(1);

            const response = await request(app).get('/api/posts?query=Test');
            expect(response.status).toBe(StatusCodes.OK);
            expect(response.body).toEqual({
                Posts: mockPosts,
                count: mockPosts.length,
                totalPosts: 1,
                totalPages: 1,
                currentPage: 1,
            });
        });
    });

    describe('deletePost', () => {
        it('should delete a post and return status 200', async () => {
            const postId = '12345';
            Post.findByIdAndDelete.mockResolvedValue(true);

            const response = await request(app).delete(`/api/posts/${postId}`);
            expect(Post.findByIdAndDelete).toHaveBeenCalledWith({ _id: postId });

            expect(response.status).toBe(StatusCodes.OK);
        });

        it('should return an error if no post found to delete', async () => {
            const postId = '12345';
            Post.findByIdAndDelete.mockResolvedValue(null); // Mocking no post found

            const response = await request(app).delete(`/api/posts/${postId}`);
            expect(Post.findByIdAndDelete).toHaveBeenCalledWith({ _id: postId });

            expect(response.status).toBe(StatusCodes.NOT_FOUND);
            expect(response.body.error).toBe(`No post found with id ${postId}`);
        });
    });
});
