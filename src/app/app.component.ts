import { Component, OnInit } from '@angular/core';
import { Comment } from './interfaces/comment';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  comments: Comment[] = this.dataService.allComments;

  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getcommentsUpdatedListener().subscribe((comments) => {
      this.comments = comments.comments;
    });
  }
}
