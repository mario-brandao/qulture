import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom, Subject } from 'rxjs';
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
export class CommentsComponent implements AfterViewInit, OnDestroy {

  @Input() userId: number = 0;
  @Input() showVoidMessage: boolean = false;
  @Input() showUserData: boolean = false;
  @Input() $updateSubject!: Subject<void>;
  comments: Comment[] = [];
  loading: boolean = true;

  constructor(
    private commentService: CommentService,
    private _snackBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.getComments();
    this.reactToUpdateSubject();
  }

  ngOnDestroy(): void {
    this.$updateSubject?.unsubscribe();
  }

  async getComments(): Promise<void> {
    this.commentService.getByCollaborator(this.userId).subscribe({
      next: (result) => {
        this.comments = (result as CommentResponse).comments || [];
        this.loading = false;
      },
      error: (_) => this._snackBar.open(MESSAGES.ERROR.GETTING_COMMENTS, GLOBAL.OK)
    });
  }

  reactToUpdateSubject(): void {
    if (!this.$updateSubject) { return; }
    this.$updateSubject.subscribe(() => this.getComments());
  }

}
