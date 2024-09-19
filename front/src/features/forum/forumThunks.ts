import { axiosApi } from '@/axiosApi';
import type { Post } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk<Post[], void>('forum/fetchPosts', async () => {
  const { data: posts } = await axiosApi.get<Post[]>('/posts');

  return posts;
});
