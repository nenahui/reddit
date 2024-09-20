import { useAppDispatch } from '@/app/hooks';
import { ForumForm } from '@/features/forum/components/forumForm';
import { createForum } from '@/features/forum/forumThunks';
import type { ForumMutation } from '@/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const initialState: ForumMutation = {
  title: '',
  content: '',
  image: null,
};

export const NewForum: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [forumMutation, setForumMutation] = React.useState<ForumMutation>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setForumMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setForumMutation((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newForum = await dispatch(createForum(forumMutation));
    if (newForum.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <>
      <ForumForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        onImageChange={handleImageChange}
        values={forumMutation}
      />
    </>
  );
};
