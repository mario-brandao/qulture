import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CommentService } from 'src/app/repositories/comment/comment.service';
import { GLOBAL } from '../../constants/global.constants';
import { MESSAGES } from '../../constants/messages.constants';
import { Comment } from '../../utils/interfaces/comment';
import { CommentResponse } from '../../utils/interfaces/comment-response.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements AfterViewInit {

  @Input() userId: number = 0;
  comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  ngAfterViewInit(): void {
    this.getComments();
  }

  async getComments(): Promise<void> {
    const $subject = this.commentService.getByCollaborator(this.userId);
    const result: CommentResponse | Object = await lastValueFrom($subject);
    
    if (!result.hasOwnProperty(GLOBAL.COMMENTS)) {
      window.alert(MESSAGES.ERROR.GETTING_COMMENTS);
      return;
    }

    this.comments = (result as CommentResponse).comments || [];
  }

}
