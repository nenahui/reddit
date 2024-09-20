export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Author {
  _id: string;
  username: string;
}

export interface Comment {
  _id: string;
  author: Author;
  content: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  image: string | null;
  comments: Comment[];
}

export interface ForumMutation {
  title: string;
  content: string;
  image: File | null;
}
