import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { firstValueFrom, lastValueFrom, of } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { MESSAGES } from 'src/app/modules/shared/constants/messages.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { SimpleObject } from 'src/app/modules/shared/utils/interfaces/simple-object.interface';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';

@Component({
  selector: 'collaborators-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  collaborators: Collaborator[] = [];
  sortedCollaborators: Collaborator[] = [];
  registerRoute = ROUTES.REGISTER;

  constructor(
    private collaboratorService: CollaboratorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCollaborators();
  }

  async getCollaborators(): Promise<void> {
    const $subject = this.collaboratorService.getAll();
    const result: {users: Collaborator[]} | Object = await lastValueFrom($subject);

    if (!result.hasOwnProperty(GLOBAL.USERS)) {
      window.alert(MESSAGES.ERROR.COLLAB_LISTING);
      return;
    }

    this.collaborators = (result as {users: Collaborator[]}).users;
    this.sortedCollaborators = this.collaborators.slice();
  }

  // TODO: pagination
  // criar serviço de fechada pra lidar com a paginação ou buscar biblioteca pronta
  sortCollaborators(sort: Sort) {
    const data = this.collaborators.slice();

    if (!sort.active || !sort.direction) {
      this.sortedCollaborators = data;
      return;
    }

    this.sortedCollaborators = data.sort((a: SimpleObject, b: SimpleObject) => {
      const isAsc = sort.direction === GLOBAL.ASC_ORDER;
      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  navigateToDetails(id: number): void {
    this.router.navigate([ROUTES.DETAILS, id]);
  }

}
