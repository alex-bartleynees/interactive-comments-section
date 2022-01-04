import { Comment } from '../interfaces/comment';
import { Reply } from '../interfaces/reply';

export function isReply(comment: Comment | Reply): comment is Reply {
  return (comment as Reply).replyingTo !== undefined;
}
