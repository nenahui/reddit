import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { ForumCard } from '@/features/forum/components/forumCard/forumCard';
import { selectPosts, selectPostsFetching } from '@/features/forum/forumSlice';
import { fetchPosts } from '@/features/forum/forumThunks';
import React, { useEffect } from 'react';

export const Forum: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <Loader absoluteCenter className={'text-muted-foreground'} />;
  }

  const postsElements =
    !loading && posts.length === 0 ? (
      <small className={'a-center'}>The list of posts is empty</small>
    ) : (
      posts.map((post) => <ForumCard key={post._id} post={post} />)
    );

  return <div className={'flex flex-col'}>{postsElements}</div>;
};
