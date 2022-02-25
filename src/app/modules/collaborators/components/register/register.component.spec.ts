import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';
import { CollabMock } from 'src/app/tests/collaborator.mock';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    collaboratorService = TestBed.inject(CollaboratorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Collab should be created properly', () => {
    spyOn(collaboratorService, 'create');
    spyOn(component, 'save').and.callThrough();

    component.form?.patchValue(CollabMock);
    const btnSave = fixture.debugElement.query(By.css(saveBtnClass)).nativeElement;
    btnSave.click();

    fixture.detectChanges();

    expect(collaboratorService.create).toHaveBeenCalledWith(component.form?.value);
    expect(component.save).toHaveBeenCalled();
  });
});
