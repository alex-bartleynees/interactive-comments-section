import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user';
import { SaveSearchForm } from '../forms/comment-form';
import { DataServiceService } from '../services/data-service.service';
import { Comment } from '../interfaces/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  @Input() user: User = this.dataService.user;
  @Input() isReply?: boolean;
  @Output() comment = new EventEmitter<string>();
  form: SaveSearchForm = new SaveSearchForm();
  btnText = 'Send';

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    if (this.isReply) {
      this.btnText = 'Reply';
    }
  }

  onSubmit() {
    const newComment: Comment = {
      content: this.form.value.comment,
      createdAt: new Date().toDateString(),
      score: 0,
      user: this.dataService.user,
      replies: []
    };
    this.dataService.addComment(newComment);
  }
}
