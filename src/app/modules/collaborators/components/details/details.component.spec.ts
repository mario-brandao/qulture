import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Collaborator } from 'src/app/modules/shared/utils/models/collaborator.model';
import { CommentService } from 'src/app/repositories/comment/comment.service';
import { CollabMock } from 'src/app/tests/collaborator.mock';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let commentService: CommentService;

  let collabMock: Collaborator;
  const commentMock = {user_id: 1, value: 'comment-mock-value'};
  const commentFieldClass = '.comment-field';
  const btnSendClass = '.btn-send';
  const collabCardClass = '.collab-card';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      declarations: [ DetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    commentService = TestBed.inject(CommentService);
    collabMock = CollabMock;
    component.collaborator = collabMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Collaborator details should render', () => {
    const collabCard = fixture.debugElement.query(By.css(collabCardClass)).nativeElement;
    expect(collabCard.innerHTML).toContain(collabMock.name);
    expect(collabCard.innerHTML).toContain(collabMock.email);
    expect(collabCard.innerHTML).toContain(collabMock.job_title);
    expect(collabCard.innerHTML).toContain(collabMock.admission_date);
  });

  it('Comments should be sent properly', () => {
    spyOn(commentService, 'create');
    spyOn(component, 'sendComment').and.callThrough();

    const commentField = fixture.debugElement.query(By.css(commentFieldClass)).nativeElement;
    const btnSend = fixture.debugElement.query(By.css(btnSendClass)).nativeElement;
    commentField.value = commentMock.value;
    const expectedPayload = {user_id: component.collaborator.id, value: commentMock.value};
    btnSend.click();

    expect(commentService.create).toHaveBeenCalledWith(expectedPayload);
    expect(component.sendComment).toHaveBeenCalledWith(commentMock.value);
  });
});
