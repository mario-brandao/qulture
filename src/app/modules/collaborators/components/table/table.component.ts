import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { MESSAGES } from 'src/app/modules/shared/constants/messages.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { CollaboratorsResponse } from 'src/app/modules/shared/utils/interfaces/collaborators-response.interface';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';

@Component({
  selector: 'collaborators-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnDestroy {
  private _collaborators: Collaborator[] | null = null;
  consideredCommentAuthors: Collaborator[] = [];
  registerRoute = ROUTES.REGISTER;

  displayedColumns = ['name', 'job_title', 'admission_date', 'email'];
  dataSource = new MatTableDataSource<Collaborator>([]);
  subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {}

  ngAfterViewInit() {
    this.getCollaborators();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async getCollaborators(): Promise<void> {
    this.collaboratorService.getAll().subscribe({
      next: (result) => {
        this.collaborators = (result as CollaboratorsResponse).users;
        this.dataSource = new MatTableDataSource<Collaborator>(this.collaborators);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.filterPredicate;
        this.watchVisibleCollaborators();
        this.setConsideredCommentAuthors();
      },
      error: (_) => this._snackBar.open(MESSAGES.ERROR.COLLAB_LISTING, GLOBAL.OK)
    });
  }

  filterPredicate(data: Collaborator, filter: string): boolean {
    const matchesName = data.name.toLowerCase().includes(filter);
    const matchesEmail = data.email.toLowerCase().includes(filter);
    const matchesRole = data.job_title.toLowerCase().includes(filter);
    return matchesName || matchesEmail || matchesRole;
  }

  watchVisibleCollaborators(): void {
    const paginationSubject = (this.dataSource.paginator as MatPaginator).page.subscribe((pageEvent: PageEvent) => {
      this.setConsideredCommentAuthors();
    });
    const sortSubject = (this.dataSource.sort as MatSort).sortChange.subscribe((pageEvent: PageEvent) => {
      this.setConsideredCommentAuthors();
    });

    this.subscription.add(paginationSubject);
    this.subscription.add(sortSubject);
  }

  setConsideredCommentAuthors(): void {
    const paginator = (this.dataSource.paginator as MatPaginator);
    const startIndex = paginator.pageIndex * paginator.pageSize;
    const endIndex = startIndex + paginator.pageSize;
    this.consideredCommentAuthors = this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  applyFilter(query: string) {
    const parsedQuery = query.trim().toLowerCase();
    this.dataSource.filter = parsedQuery;
    this.setConsideredCommentAuthors();
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
