import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Subject, Subscription } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { MESSAGES } from 'src/app/modules/shared/constants/messages.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { CollaboratorResponse } from 'src/app/modules/shared/utils/interfaces/collaborator-response.interface';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';
import { CommentService } from 'src/app/repositories/comment/comment.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private _collaborator!: Collaborator;
  private $subscriptions = new Subscription();
  $updateComments = new Subject<void>();
  editRoute = `/${ROUTES.EDIT}`;

  constructor(
    private route: ActivatedRoute,
    private collaboratorService: CollaboratorService,
    private commentService: CommentService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.reactToRouteParams();
  }

  ngOnDestroy(): void {
    this.$subscriptions.unsubscribe();
  }

  reactToRouteParams(): void {
    const routeSubscription = this.route.params.subscribe((params: {[key: string]: string}) => {
      const idParam = +params['id'];
      if (isNaN(idParam)) {
        this.reactToLoadError();
      } else {
        this.getCollaboratorById(idParam);
      }
    });
    this.$subscriptions.add(routeSubscription);
  }

  async getCollaboratorById(id: number): Promise<void> {
    this.collaboratorService.getById(id).subscribe({
      next: (result) => {
        this.collaborator = (result as {user: Collaborator}).user;
      },
      error: (_) => this.reactToLoadError()
    });
  }

  reactToLoadError(): void {
    this._snackBar.open(MESSAGES.ERROR.GETTING_COLLABORATOR, GLOBAL.OK);
    this.router.navigate(['']);
  }

  async sendComment(value: string): Promise<void> {
    this.commentService.create({user_id: this.collaborator.id, value}).subscribe({
      next: (_) => {
        this._snackBar.open(MESSAGES.SUCCESS.SENDING_COMMENT, GLOBAL.OK);
        this.$updateComments.next();
      },
      error: (_) => this.reactToCommentError()
    });
  }

  reactToCommentError(): void {
    this._snackBar.open(MESSAGES.ERROR.SENDING_COMMENT, GLOBAL.OK);
  }
  
  get collaborator(): Collaborator {
    return this._collaborator as Collaborator;
  }

  set collaborator(collaborator: Collaborator) {
    this._collaborator = collaborator;
  }
  

}
