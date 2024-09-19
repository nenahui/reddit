import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/formatDate';
import type { Post } from '@/types';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  post: Post;
}

export const ForumCard: React.FC<Props> = ({ post }) => {
  return (
    <Card
      className={
        'shadow-none hover:bg-gray-50 duration-100 border-0 border-b px-3 rounded-none flex items-center justify-between'
      }
    >
      <div className={''}>
        <CardHeader className={'p-3 pb-0 pt-4'}>
          <CardTitle>
            <div className={'flex items-center gap-2'}>
              <Avatar className={'size-8'}>
                <AvatarFallback className={'text-sm font-normal duration-100'}>
                  {post.author.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <h4 className={'text-sm flex gap-2 items-center'}>
                kanat <small>·</small>
                <span className={'font-normal'}>{formatDate(post.createdAt)}</span>
              </h4>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className={'p-3 pb-0'}>
          <h3 className={'text-lg leading-none font-medium'}>{post.title}</h3>
        </CardContent>

        <CardFooter className={'p-3 pb-4'}>
          <small className={'flex items-center gap-1'}>
            <EnvelopeClosedIcon /> · {post.comments.length} comments
          </small>
        </CardFooter>
      </div>

      <img
        src={'https://i.pinimg.com/564x/cb/a0/b8/cba0b89d2bf2d96a1ed26edb5849f804.jpg'}
        alt={'React Router'}
        className={'rounded-lg h-20'}
      />
    </Card>
  );
};
