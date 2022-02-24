import { AfterViewInit, Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @Input() showVoidMessage: boolean = false;
  comments: Comment[] = [];
  loading: boolean = true;

  constructor(
    private commentService: CommentService,
    private _snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.getComments();
  }

  async getComments(): Promise<void> {
    const $subject = this.commentService.getByCollaborator(this.userId);
    const result: CommentResponse | Object = await lastValueFrom($subject);

    if (!result.hasOwnProperty(GLOBAL.COMMENTS)) {
      this._snackBar.open(MESSAGES.ERROR.GETTING_COMMENTS, GLOBAL.OK);
      return;
    }

    this.comments = (result as CommentResponse).comments || [];
    this.loading = false;
  }

}
