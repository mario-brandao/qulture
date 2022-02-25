import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { MESSAGES } from 'src/app/modules/shared/constants/messages.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { Collaborator } from 'src/app/modules/shared/utils/models/collaborator.model';
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
    private _snackBar: MatSnackBar,
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
      photo_url: new FormControl(null, Validators.required),
      job_title: new FormControl(null, Validators.compose([
        Validators.required, Validators.minLength(3)
      ])),
      admission_date: new FormControl(null, Validators.required),
    });
  }

  async save(): Promise<void> {
    if (this.form?.invalid) {
      this._snackBar.open(MESSAGES.ERROR.FIX_VALUES, GLOBAL.OK);
      return;
    }

    this.collaboratorService.create(this.form?.value).subscribe({
      next: (result) => this.navigateToDetails((result as {user: Collaborator}).user.id),
      error: (_) => this._snackBar.open(MESSAGES.ERROR.COLLAB_CREATION, GLOBAL.OK)
    });
  }

  navigateToDetails(id: number): void {
    this.router.navigate([ROUTES.DETAILS, id]);
  }
}
