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
  user: User = data.currentUser;
  isReply = false;

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
    if (reply) {
      const newReply: Reply = {
        content: reply,
        createdAt: new Date().toDateString(),
        score: 0,
        user: this.user,
        replyingTo: this.comment.user.username
      };

      this.comment.replies?.push(newReply);
      console.log(this.comment);
    }
  }

  onDelete(reply?: Reply) {
    if (reply) {
      this.comment.replies = this.comment.replies?.filter(
        (item) => item.id !== reply.id
      );
    } else {
      this.dataService.deleteComment(this.comment);
    }
  }

  onEdit() {}
}
