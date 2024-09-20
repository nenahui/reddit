import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { ForumMutation, Post } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk<Post[], void>('forum/fetchPosts', async () => {
  const { data: posts } = await axiosApi.get<Post[]>('/posts');

  return posts;
});

export const createForum = createAsyncThunk<void, ForumMutation, { state: RootState }>(
  'forum/create',
  async (forumMutation, { getState }) => {
    const token = getState().users.user?.token;

    if (!forumMutation.content || !forumMutation.title) {
      throw new Error('Title and content are required');
    }

    const formData = new FormData();
    formData.append('title', forumMutation.title);
    formData.append('content', forumMutation.content);

    if (forumMutation.image) {
      formData.append('image', forumMutation.image);
    }

    await axiosApi.post('/posts', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);
