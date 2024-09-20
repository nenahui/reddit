import { type Model, Types } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface PostFields {
  author: Types.ObjectId;
  title: string;
  content: string;
  image: string;
  createdAt: Date;
  comments: Comment[];
}

export type PostModel = Model<PostFields>;
