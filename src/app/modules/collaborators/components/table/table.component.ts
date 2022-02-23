import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { MESSAGES } from 'src/app/modules/shared/constants/messages.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { CollaboratorResponse } from 'src/app/modules/shared/utils/interfaces/collaborator-response.interface';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { CollaboratorsResponse } from 'src/app/modules/shared/utils/interfaces/collaborators-response.interface';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';

@Component({
  selector: 'collaborators-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  private _collaborators: Collaborator[] | null = null;
  registerRoute = ROUTES.REGISTER;

  displayedColumns = ['name', 'job_title', 'admission_date', 'email'];
  dataSource = new MatTableDataSource<Collaborator>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router,
  ) {}
  
  ngAfterViewInit() {
    this.getCollaborators();
  }

  async getCollaborators(): Promise<void> {
    const $subject = this.collaboratorService.getAll();
    const result: CollaboratorsResponse | Object = await lastValueFrom($subject);

    if (!result.hasOwnProperty(GLOBAL.USERS)) {
      window.alert(MESSAGES.ERROR.COLLAB_LISTING);
      return;
    }

    this.collaborators = (result as CollaboratorsResponse).users;
    this.dataSource = new MatTableDataSource<Collaborator>(this.collaborators);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(query: string) {
    const parsedQuery = query.trim().toLowerCase(); 
    this.dataSource.filter = parsedQuery;
  }

  navigateToDetails(id: number): void {
    this.router.navigate([ROUTES.DETAILS, id]);
  }

  get collaborators(): Collaborator[] {
    return this._collaborators as Collaborator[];
  }

  set collaborators(collaborators) {
    this._collaborators = collaborators;
  }
}
