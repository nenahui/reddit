import { useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { selectPostsCreating } from '@/features/forum/forumSlice';
import type { ForumMutation } from '@/types';
import React from 'react';

interface Props {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: ForumMutation;
}

export const ForumForm: React.FC<Props> = ({ onSubmit, onChange, values, onImageChange }) => {
  const loading = useAppSelector(selectPostsCreating);

  return (
    <form onSubmit={onSubmit}>
      <div className={'flex flex-col gap-3'}>
        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='title'
            id='title'
            name='title'
            placeholder='Enter title'
            onChange={onChange}
            value={values.title}
            required
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='content'>Content</Label>
          <Textarea
            id='content'
            rows={5}
            placeholder='Enter content'
            name='content'
            onChange={onChange}
            value={values.content}
          />
        </div>

        <div className='grid w-full items-center gap-1.5'>
          <Label htmlFor='image'>Image</Label>
          <Input type='file' id='image' onChange={onImageChange} />
        </div>

        <Button type={'submit'} disabled={loading}>
          Create a forum {loading && <Loader className={'size-5 ml-2'} />}
        </Button>
      </div>
    </form>
  );
};
