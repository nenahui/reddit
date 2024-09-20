import mongoose from 'mongoose';
import { config } from './config';
import { Post } from './model/Post';
import { User } from './model/User';
import { Comment } from './model/Comment';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('posts');
    await db.dropCollection('comments');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const firstUser = new User({ username: 'kanat', password: '123qwe' });
  firstUser.generateToken();
  await firstUser.save();

  const secondUser = new User({ username: 'argen', password: '123qwe' });
  secondUser.generateToken();
  await secondUser.save();

  const post1 = new Post({
    title: 'First Post',
    content: 'This is the first post content.',
    author: firstUser._id,
    comments: [],
  });

  const post2 = new Post({
    title: 'Second Post',
    content: 'This is the second post content.',
    author: secondUser._id,
    comments: [],
  });

  await post1.save();
  await post2.save();

  const comment1 = new Comment({
    author: firstUser._id,
    content: 'First comment on post 1',
  });

  const comment2 = new Comment({
    author: secondUser._id,
    content: 'Second comment on post 1',
  });

  const comment3 = new Comment({
    author: firstUser._id,
    content: 'First comment on post 2',
  });

  const comment4 = new Comment({
    author: secondUser._id,
    content: 'Second comment on post 2',
  });

  post1.comments.push(comment1);
  post1.comments.push(comment2);
  post2.comments.push(comment3);
  post2.comments.push(comment4);

  await comment1.save();
  await comment2.save();
  await comment3.save();
  await comment4.save();

  await post1.save();
  await post2.save();

  await db.close();
};

run().catch(console.error);
