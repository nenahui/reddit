import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const formatDate = (date: string): string => {
  const postDate = dayjs(date);
  const now = dayjs();

  if (postDate.isSame(now, 'day')) {
    return postDate.fromNow();
  } else if (postDate.isSame(now.subtract(1, 'day'), 'day')) {
    return `Yesterday ${postDate.format('HH:mm A')}`;
  } else if (postDate.isSame(now, 'year')) {
    return postDate.format('D MMMM');
  } else {
    return postDate.format('DD.MM.YYYY');
  }
};
