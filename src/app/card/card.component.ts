import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { Reply } from '../interfaces/reply';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() user!: User;
  @Input() comment!: Comment;
  @Input() reply?: Reply;
  @Output() score = new Subject<null>();

  constructor() {}

  ngOnInit(): void {}

  increaseScore() {
    this.comment.score++;
    this.score.next(null);
  }

  decreaseScore() {
    this.comment.score--;
    this.score.next(null);
  }
}
