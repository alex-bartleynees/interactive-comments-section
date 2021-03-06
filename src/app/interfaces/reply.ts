import { User } from './user';

export interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo: string;
}
