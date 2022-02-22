import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { MESSAGES } from 'src/app/modules/shared/constants/messages.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup | null;

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router,
  ) {
    this.form = null;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.compose([
        Validators.required, Validators.minLength(4)
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required, Validators.email
      ])),
      photo_url: new FormControl(null),
      job_title: new FormControl(null, Validators.compose([
        Validators.required, Validators.minLength(3)
      ])),
      admission_date: new FormControl(null, Validators.required),
    });
  }

  async save(): Promise<void> {
    const $subject = this.collaboratorService.create(this.form?.value);
    const result: {user: Collaborator} | Object = await lastValueFrom($subject);
    console.log(result);
    if (!result.hasOwnProperty(GLOBAL.USER)) {
      window.alert(MESSAGES.ERROR.COLLAB_CREATION);
      return;
    }
    this.navigateToDetails((result as {user: Collaborator}).user.id);
  }

  navigateToDetails(id: number): void {
    this.router.navigate([ROUTES.DETAILS, id]);
  }
}
