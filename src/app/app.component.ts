import { Component } from '@angular/core';
import data from '../../data.json';
import { Comment } from './interfaces/comment';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  comments: Comment[] = data.comments;
  currentUser: User = data.currentUser;
  constructor() {}

  onScore() {
    this.comments.sort((a, b) => b.score - a.score);
  }
}
