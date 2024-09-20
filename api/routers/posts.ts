import express from 'express';
import { auth, type RequestWithUser } from '../middleware/auth';
import { Comment } from '../model/Comment';
import { Post } from '../model/Post';
import { imagesUpload } from '../multer';

export const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'username');

    const postsWithCommentCount = posts.map((post) => ({
      ...post.toObject(),
      commentCount: post.comments.length,
      comments: undefined,
    }));

    return res.send(postsWithCommentCount);
  } catch (error) {
    return next(error);
  }
});

postsRouter.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate('author', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username',
        },
      });

    if (!post) {
      return res.status(404).send({ error: 'Forum not found' });
    }

    return res.send(post);
  } catch (error) {
    return next(error);
  }
});

postsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const { body, user } = req;

    if (!user) {
      return res.status(403).send({ error: 'User not found' });
    }

    const image = req.file?.filename || null;
    const { content } = body;

    if (!content && !image) {
      return res.status(400).send({ error: 'Either image or description must be present!' });
    }

    const post = new Post({
      title: body.title,
      content: content || null,
      author: user._id,
      image: image,
    });

    await post.save();

    return res.send(post);
  } catch (error) {
    return next(error);
  }
});

postsRouter.post('/:postId/comments', auth, async (req: RequestWithUser, res, next) => {
  try {
    const { user } = req;
    const { postId } = req.params;
    const { content } = req.body;

    if (!user) {
      return res.status(403).send({ error: 'User not found' });
    }

    if (!content) {
      return res.status(400).send({ error: 'Content is required' });
    }

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
