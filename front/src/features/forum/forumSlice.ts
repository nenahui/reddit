import { fetchPosts } from '@/features/forum/forumThunks';
import type { Post } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface ForumState {
  posts: Post[];
  postsFetching: boolean;
}

const initialState: ForumState = {
  posts: [],
  postsFetching: false,
};

export const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.postsFetching = true;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.posts = posts;
        state.postsFetching = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.postsFetching = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsFetching: (state) => state.postsFetching,
  },
});

export const { selectPosts, selectPostsFetching } = forumSlice.selectors;
