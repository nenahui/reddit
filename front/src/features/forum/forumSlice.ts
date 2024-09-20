import { createComment, createForum, fetchOneForum, fetchPosts } from '@/features/forum/forumThunks';
import type { GlobalError, OnePost, Post } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface ForumState {
  posts: Post[];
  onePost: OnePost | null;
  postsFetching: boolean;
  postsCreating: boolean;
  onePostsFetching: boolean;
  commentCreating: boolean;
  createError: GlobalError | null;
}

const initialState: ForumState = {
  posts: [],
  onePost: null,
  postsFetching: false,
  postsCreating: false,
  onePostsFetching: false,
  commentCreating: false,
  createError: null,
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
        state.createError = null;
        state.postsCreating = true;
      })
      .addCase(createForum.fulfilled, (state) => {
        state.postsCreating = false;
      })
      .addCase(createForum.rejected, (state, { payload: error }) => {
        state.createError = error || null;
        state.postsCreating = false;
      });

    builder
      .addCase(fetchOneForum.pending, (state) => {
        state.onePostsFetching = true;
      })
      .addCase(fetchOneForum.fulfilled, (state, { payload: post }) => {
        state.onePost = post;
        state.onePostsFetching = false;
      })
      .addCase(fetchOneForum.rejected, (state) => {
        state.onePostsFetching = false;
      });

    builder
      .addCase(createComment.pending, (state) => {
        state.commentCreating = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.commentCreating = false;
      })
      .addCase(createComment.rejected, (state) => {
        state.commentCreating = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPostsFetching: (state) => state.postsFetching,
    selectPostsCreating: (state) => state.postsCreating,
    selectOnePost: (state) => state.onePost,
    selectOnePostFetching: (state) => state.onePostsFetching,
    selectCommentCreating: (state) => state.commentCreating,
    selectPostCreateError: (state) => state.createError,
  },
});

export const {
  selectPosts,
  selectPostsFetching,
  selectPostsCreating,
  selectOnePostFetching,
  selectOnePost,
  selectCommentCreating,
  selectPostCreateError,
} = forumSlice.selectors;
