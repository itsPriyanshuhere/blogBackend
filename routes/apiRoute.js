import express from 'express';
import { getPosts, sendPosts ,postDetails, postComment } from '../controllers/index.js';

const router = express.Router();

router.get('/posts', getPosts);

router.post('/posts', sendPosts);

router.get('/post/:id', postDetails);

router.put('/post/:id', postComment);

export default router;