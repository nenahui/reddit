import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { CommentMutation, ForumMutation, GlobalError, OnePost, Post } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const fetchPosts = createAsyncThunk<Post[], void>('forum/fetchPosts', async () => {
  const { data: posts } = await axiosApi.get<Post[]>('/posts');

  return posts;
});

export const createForum = createAsyncThunk<void, ForumMutation, { state: RootState; rejectValue: GlobalError }>(
  'forum/create',
  async (forumMutation, { getState, rejectWithValue }) => {
    try {
      const token = getState().users.user?.token;

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
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const fetchOneForum = createAsyncThunk<OnePost, string>('forum/fetchOneForum', async (id) => {
  const { data: post } = await axiosApi.get<OnePost>(`/posts/${id}`);

  return post;
});

export const createComment = createAsyncThunk<
  void,
  { commentMutation: CommentMutation; postId: string },
  { state: RootState }
>('forum/createComment', async ({ commentMutation, postId }, { getState }) => {
  const token = getState().users.user?.token;

  if (!commentMutation.content) {
    return console.error(`Content is required ${commentMutation.content}`);
  }

  await axiosApi.post(`/posts/${postId}/comments`, commentMutation, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});
