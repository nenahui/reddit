import { createForum, fetchPosts } from '@/features/forum/forumThunks';
import type { Post } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface ForumState {
  posts: Post[];
  postsFetching: boolean;
  postsCreating: boolean;
}

const initialState: ForumState = {
  posts: [],
  postsFetching: false,
  postsCreating: false,
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

    builder
      .addCase(createForum.pending, (state) => {
        state.postsCreating = true;
      })
      .addCase(createForum.fulfilled, (state) => {
        state.postsCreating = false;
      })
      .addCase(createForum.rejected, (state) => {
        state.postsCreating = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsFetching: (state) => state.postsFetching,
    selectPostsCreating: (state) => state.postsCreating,
  },
});

export const { selectPosts, selectPostsFetching, selectPostsCreating } = forumSlice.selectors;
