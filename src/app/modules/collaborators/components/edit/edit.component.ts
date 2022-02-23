import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
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
export class EditComponent implements OnInit {

  form: FormGroup | null;
  private _collaborator: Collaborator | null = null;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collaboratorService: CollaboratorService
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
      if (!isNaN(idParam)) {
        this.getCollaboratorByRoute(idParam);
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

  async getCollaboratorByRoute(id: number): Promise<void> {
    const $subject = this.collaboratorService.getById(id);
    const result: {users: Collaborator} | Object = await lastValueFrom($subject);

    if (!result.hasOwnProperty(GLOBAL.USER)) {
      window.alert('Error');
      return;
    }

    this.collaborator = (result as {user: Collaborator}).user;
    this.setFormInitialValues();
  }

  async update(): Promise<void> {
    const $subject = this.collaboratorService.patch(this.collaborator.id, this.form?.value);
    const result: {user: Collaborator} | Object = await lastValueFrom($subject);
    if (!result.hasOwnProperty(GLOBAL.USER)) {
      window.alert(MESSAGES.ERROR.COLLAB_EDITION);
      return;
    }
    window.alert(MESSAGES.SUCCESS.COLLAB_EDITION);
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
