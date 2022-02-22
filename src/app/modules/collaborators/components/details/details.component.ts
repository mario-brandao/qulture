import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { ROUTES } from 'src/app/modules/shared/constants/routes.constants';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { CollaboratorService } from 'src/app/repositories/collaborator/collaborator.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  collaborator: Collaborator | null = null;
  editRoute = `/${ROUTES.EDIT}`;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private collaboratorService: CollaboratorService
  ) { }

  ngOnInit(): void {
    this.reactToRouteParams();
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

  async getCollaboratorByRoute(id: number): Promise<void> {
    const $subject = this.collaboratorService.getById(id);
    const result: {users: Collaborator} | Object = await lastValueFrom($subject);

    if (!result.hasOwnProperty(GLOBAL.USER)) {
      window.alert('Error');
      return;
    }

    this.collaborator = (result as {user: Collaborator}).user;
  }

}
