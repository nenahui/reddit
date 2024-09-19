import express from 'express';
import { auth } from '../middleware/auth';
import { Post } from '../model/Post';
import { User } from '../model/User';

export const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    return res.send(posts);
  } catch (error) {
    return next(error);
  }
});

postsRouter.post('/', auth, async (req, res, next) => {
  try {
    const { body } = req;
    const headerValue = req.get('Authorization');

    switch (true) {
      case !body.title:
        return res.status(400).send({ error: 'Title is required' });
      case !body.content:
        return res.status(400).send({ error: 'Content is required' });
      default:
    }

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if (!token) return res.status(204).send();

    const user = await User.findOne({ token });

    if (!user) return res.status(204).send();

    const post = new Post({
      title: body.title,
      content: body.content,
      author: user._id,
    });
    await post.save();

    return res.send(post);
  } catch (error) {
    return next(error);
  }
});
