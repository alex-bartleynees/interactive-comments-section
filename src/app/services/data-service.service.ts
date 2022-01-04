import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import data from '../../../data.json';
import { Comment } from '../interfaces/comment';
import { Reply } from '../interfaces/reply';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private comments: Comment[] = data.comments;
  private currentUser: User = data.currentUser;
  private commentsUpdated = new Subject<{ comments: Comment[] }>();

  constructor() {}

  get user() {
    return this.currentUser;
  }

  get allComments() {
    return this.comments;
  }

  getcommentsUpdatedListener() {
    return this.commentsUpdated.asObservable();
  }

  sortComments() {
    this.comments.sort((a, b) => b.score - a.score);
  }

  addComment(newComment: Comment) {
    this.comments.push(newComment);
  }

  deleteComment(comment: Comment | Reply) {
    this.comments = this.comments.filter((item) => item.id !== comment.id);
    this.commentsUpdated.next({ comments: [...this.comments] });
  }
}
