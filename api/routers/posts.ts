import express from 'express';
import { auth } from '../middleware/auth';
import { Post } from '../model/Post';
import { User } from '../model/User';
import { Comment } from '../model/Comment';
import { imagesUpload } from '../multer';

export const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username',
        },
      });

    return res.send(posts);
  } catch (error) {
    return next(error);
  }
});

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
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
      image: req.file?.filename || null,
    });

    await post.save();

    return res.send(post);
  } catch (error) {
    return next(error);
  }
});

postsRouter.post('/:postId/comments', auth, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const headerValue = req.get('Authorization');

    if (!content) {
      return res.status(400).send({ error: 'Content is required' });
    }

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if (!token) return res.status(204).send();

    const user = await User.findOne({ token });

    if (!user) return res.status(204).send();

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }

    const comment = new Comment({
      author: user._id,
      post: post._id,
      content,
    });

    await comment.save();

    post.comments.push(comment);
    await post.save();

    return res.send(comment);
  } catch (error) {
    return next(error);
  }
});
