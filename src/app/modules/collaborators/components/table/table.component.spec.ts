import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Collaborator } from 'src/app/modules/shared/utils/models/collaborator.model';
import { CollaboratorsResponse } from 'src/app/modules/shared/utils/models/collaborators-response.model';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';
import { CollabMock } from 'src/app/tests/collaborator.mock';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let collaboratorService: CollaboratorService;
  let router: Router;

  const collabServiceResponse = new CollaboratorsResponse();
  const collabMock1 = CollabMock;
  const collabMock2 = new Collaborator();
  collabMock2.id = 2;
  collabMock2.name = 'collab2-name';
  collabMock2.email = 'collab2-email';
  collabMock2.job_title = 'collab2-job_title';
  collabMock2.admission_date = new Date();
  collabServiceResponse.users = [collabMock1, collabMock2];

  const tableClass = '.collab-table';
  const searchInputClass = '.search-input';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      declarations: [ TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    collaboratorService = TestBed.inject(CollaboratorService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  describe('Smoke tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('#consideredCommentAuthors should be defined', () => {
      expect(component.consideredCommentAuthors).toBeDefined();
    });
    it('#registerRoute should be defined', () => {
      expect(component.registerRoute).toBeDefined();
    });
    it('#displayedColumns should be defined', () => {
      expect(component.displayedColumns).toBeDefined();
    });
    it('#dataSource should be defined', () => {
      expect(component.dataSource).toBeDefined();
    });
    it('#subscription should be defined', () => {
      expect(component.subscription).toBeDefined();
    });
    it('#collaborators should be defined', () => {
      expect(component.collaborators).toBeDefined();
    });
  });

  describe('Functionality tests', () => {
    it('#ngAfterViewInit', () => {
      spyOn(component, 'getCollaborators');
      component.ngAfterViewInit();
      expect(component.getCollaborators).toHaveBeenCalled();
    });

    it('#ngOnDestroy', () => {
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });

    describe('#getCollaborators', () => {
      it('should render results', () => {
        spyOn(collaboratorService, 'getAll').and.returnValue(of(collabServiceResponse));
        spyOn(component, 'watchVisibleCollaborators').and.callThrough();
        spyOn(component, 'setConsideredCommentAuthors').and.callThrough();
        component.getCollaborators();
        fixture.detectChanges();
        const table = fixture.debugElement.query(By.css(tableClass)).nativeElement.innerHTML;
        expect(table).toContain(collabMock1.name);
        expect(table).toContain(collabMock1.email);
        expect(table).toContain(collabMock1.job_title);
        expect(table).toContain(collabMock2.name);
        expect(table).toContain(collabMock2.email);
        expect(table).toContain(collabMock2.job_title);
        expect(component.watchVisibleCollaborators).toHaveBeenCalled();
        expect(component.setConsideredCommentAuthors).toHaveBeenCalled();
      });
    });

    it('Filter should execute properly', () => {
      spyOn(collaboratorService, 'getAll').and.returnValue(of(collabServiceResponse));
      spyOn(component, 'applyFilter').and.callThrough();
      component.getCollaborators();
      fixture.detectChanges();

      const searchField = fixture.debugElement.query(By.css(searchInputClass)).nativeElement;
      searchField.value = collabMock2.name;
      searchField.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();
      const table = fixture.debugElement.query(By.css(tableClass)).nativeElement.innerHTML;

      expect(table).toContain(collabMock2.name);
      expect(table).toContain(collabMock2.email);
      expect(table).toContain(collabMock2.job_title);
      expect(table).not.toContain(collabMock1.name);
      expect(table).not.toContain(collabMock1.email);
      expect(table).not.toContain(collabMock1.job_title);
      expect(component.applyFilter).toHaveBeenCalledWith(collabMock2.name);
    });

    it('#navigateToDetails', () => {
      spyOn(router, 'navigate');
      component.navigateToDetails(collabMock1.id);
      expect(router.navigate).toHaveBeenCalledWith([ROUTES.DETAILS, collabMock1.id]);
    });
  });
});
