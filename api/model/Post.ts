import mongoose from 'mongoose';
import { User } from './User';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,

    validate: {
      validator: async function (value: string): Promise<boolean> {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Post = mongoose.model('Post', PostSchema);
