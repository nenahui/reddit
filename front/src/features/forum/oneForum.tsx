import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { API_URL } from '@/consts';
import { selectCommentCreating, selectOnePost, selectOnePostFetching } from '@/features/forum/forumSlice';
import { createComment, fetchOneForum } from '@/features/forum/forumThunks';
import { selectUser } from '@/features/users/usersSlice';
import { formatDate } from '@/lib/formatDate';
import type { CommentMutation } from '@/types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const OneForum: React.FC = () => {
  const user = useAppSelector(selectUser);
  const [commentInput, setCommentInput] = useState<CommentMutation>({
    content: '',
  });
  const [inputActive, setInputActive] = useState(false);
  const { id: forumId } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);
  const loading = useAppSelector(selectOnePostFetching);
  const commentCreating = useAppSelector(selectCommentCreating);

  useEffect(() => {
    dispatch(fetchOneForum(forumId));
  }, [dispatch, forumId]);

  if (loading) {
    return <Loader absoluteCenter className={'size-5 text-muted-foreground'} />;
  }

  if (post === null) {
    return (
      <p className={'a-center text-muted-foreground text-sm'}>
        An error occurred while receiving post data, please try again.
      </p>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput({
      content: e.target.value,
    });
    console.log(commentInput);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createComment({ commentMutation: commentInput, postId: forumId }));
    setCommentInput({ content: '' });
    dispatch(fetchOneForum(forumId));
  };

  const handleInputActive = () => {
    setInputActive(true);
  };

  const handleInputDeactive = () => {
    setInputActive(false);
    setCommentInput({ content: '' });
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <div className={'flex gap-2 items-center'}>
        <Avatar className={'size-8'}>
          <AvatarFallback className={'text-sm font-normal duration-100'}>
            {post.author.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <h4 className={'text-sm flex gap-2 items-center'}>
          kanat <p className={'text-lg'}>·</p>
          <span className={'font-normal'}>{formatDate(post.createdAt)}</span>
        </h4>
      </div>

      <div className={'mb-2'}>
        <h2 className={'text-xl'}>{post.title}</h2>
        <p className={'text-muted-foreground text-sm mb-3'}>{post.content}</p>
        {post.image && (
          <img src={`${API_URL}/${post.image}`} alt={post.title} className={'rounded-xl w-full object-cover'} />
        )}
      </div>

      {user && (
        <div>
          <form onSubmit={handleSubmit} className={'relative'}>
            <Input
              onKeyDown={handleKeyDown}
              onFocus={handleInputActive}
              value={commentInput.content}
              onChange={handleChange}
              placeholder={'Add a comment'}
              className={'pr-20 pl-4 h-12 rounded-full'}
            />
            {!commentCreating ? (
              <>
                <Button
                  type={'reset'}
                  onClick={handleInputDeactive}
                  variant={'ghost'}
                  className={`absolute top-1/2 opacity-0 pointer-events-none ${inputActive && 'opacity-100 pointer-events-auto'} duration-200 transition-opacity -translate-y-2/4 right-[70px] h-10 rounded-full`}
                >
                  Cancel
                </Button>

                <Button
                  type={'submit'}
                  className={`absolute top-1/2 opacity-0 pointer-events-none ${inputActive && 'opacity-100 pointer-events-auto'} duration-200 transition-opacity -translate-y-2/4 right-1 h-10 rounded-full`}
                >
                  Add
                </Button>
              </>
            ) : (
              <div className={'absolute top-1/2 -translate-y-2/4 right-4 text-muted-foreground'}>
                <Loader className={'size-5'} />
              </div>
            )}
          </form>
        </div>
      )}

      <div>
        {post.comments?.length === 0 ? (
          <small className={'my-4 rounded-md px-2 py-1 bg-gray-200 max-w-max mx-auto text-muted-foreground block'}>
            No comments
          </small>
        ) : (
          post.comments?.map((comment) => (
            <div className={'bg-gray-100 p-3 rounded-xl mb-2'} key={comment._id}>
              <h4 className={'text-sm flex gap-2 items-center'}>
                {comment.author.username} <p className={'text-lg'}>·</p>
                <span className={'font-normal'}>{formatDate(comment.createdAt)}</span>
              </h4>
              <p className={'text-sm'}>{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
