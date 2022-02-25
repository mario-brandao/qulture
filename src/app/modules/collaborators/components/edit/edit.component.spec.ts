import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Collaborator } from 'src/app/modules/shared/utils/models/collaborator.model';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';
import { CollabMock } from 'src/app/tests/collaborator.mock';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let collaboratorService: CollaboratorService;

  const saveBtnClass = '.btn-save';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [ EditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    collaboratorService = TestBed.inject(CollaboratorService);
    component.collaborator = CollabMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getCollaboratorById should set form values', () => {
    spyOn(collaboratorService, 'getById').and.returnValue(of({user: CollabMock}));
    component.getCollaboratorById(component.collaborator.id);
    fixture.detectChanges();
    expect(component.form?.value.name).toEqual(component.collaborator.name);
    expect(component.form?.value.email).toEqual(component.collaborator.email);
    expect(component.form?.value.job_title).toEqual(component.collaborator.job_title);
    expect(component.form?.value.admission_date).toEqual(component.collaborator.admission_date);
  });

  it('Collab should be updated properly', () => {
    spyOn(collaboratorService, 'patch').and.returnValue(of(new Error('error')));
    spyOn(component, 'update').and.callThrough();

    component.setFormInitialValues();
    const btnSave = fixture.debugElement.query(By.css(saveBtnClass)).nativeElement;
    btnSave.click();

    fixture.detectChanges();

    expect(collaboratorService.patch).toHaveBeenCalledWith(component.collaborator.id, component.form?.value);
    expect(component.update).toHaveBeenCalled();
  });
});
