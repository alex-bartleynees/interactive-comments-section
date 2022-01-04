import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../interfaces/comment';
import { User } from '../interfaces/user';
import data from '../../../data.json';
import { Reply } from '../interfaces/reply';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() parentComment?: Comment;
  user: User = data.currentUser;
  isReply = false;
  isEdit = false;
  isDelete = false;

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {}

  increaseScore() {
    this.comment.score++;
    this.onScore();
  }

  decreaseScore() {
    this.comment.score--;
    this.onScore();
  }

  onScore() {
    this.dataService.sortComments();
  }

  onReply() {
    this.isReply = true;
  }

  addReply(reply: string) {
    if (!reply) {
      return;
    }

    const newReply: Reply = {
      id: Math.floor(Math.random() * 100),
      content: reply,
      createdAt: new Date().toDateString(),
      score: 0,
      user: this.user,
      replyingTo: this.comment.user.username
    };

    if (this.parentComment) {
      this.parentComment.replies?.push(newReply);
    } else {
      this.comment.replies?.push(newReply);
    }
    this.isReply = false;
  }

  editComment(content: string) {
    this.comment.content = content;
    this.isEdit = false;
  }

  onDelete() {
    this.isDelete = !this.isDelete;
  }

  deleteComment() {
    this.dataService.deleteComment(this.comment, this.parentComment);
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }
}
