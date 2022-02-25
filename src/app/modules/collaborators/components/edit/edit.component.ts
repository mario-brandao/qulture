import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { MESSAGES } from 'src/app/modules/shared/constants/messages.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  form: FormGroup | null;
  private _collaborator: Collaborator | null = null;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collaboratorService: CollaboratorService,
    private _snackBar: MatSnackBar,
  ) {
    this.form = null;
  }

  ngOnInit(): void {
    this.reactToRouteParams();
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    this.subscriptions.add(routeSubscription);
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required, Validators.email
      ])),
      photo_url: new FormControl(null),
      job_title: new FormControl(null, Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      admission_date: new FormControl(null, Validators.required),
    });
  }

  setFormInitialValues(): void {
    this.form?.patchValue((this.collaborator as Collaborator));
  }

  getCollaboratorById(id: number): void {
    this.collaboratorService.getById(id).subscribe({
      next: (result) => {
        this.collaborator = (result as {user: Collaborator}).user;
        this.setFormInitialValues();
      },
      error: (_) => this.reactToLoadError()
    });
  }

  update(): void {
    if (this.form?.invalid) {
      this._snackBar.open(MESSAGES.ERROR.FIX_VALUES, GLOBAL.OK);
      return;
    }
    
    this.collaboratorService.patch(this.collaborator.id, this.form?.value).subscribe({
      next: (_) => {
        this._snackBar.open(MESSAGES.SUCCESS.COLLAB_EDITION);
        this.navigateToDetails();
      },
      error: (_) => this._snackBar.open(MESSAGES.ERROR.COLLAB_EDITION, GLOBAL.OK)
    });
  }

  reactToLoadError(): void {
    this._snackBar.open(MESSAGES.ERROR.GETTING_COLLABORATOR, GLOBAL.OK);
    this.router.navigate(['']);
  }

  navigateToDetails(): void {
    this.router.navigate([ROUTES.DETAILS, this.collaborator.id]);
  }

  get collaborator(): Collaborator {
    return this._collaborator as Collaborator;
  }

  set collaborator(collaborator) {
    this._collaborator = collaborator;
  }

}
