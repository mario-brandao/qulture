import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../shared/constants/routes.constants';
import { CollaboratorsComponent } from './collaborators.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { RegisterComponent } from './components/register/register.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  {
    path: '',
    component: CollaboratorsComponent,
    children: [
      {
        path: '',
        component: TableComponent,
      },
      {
        path: `${ROUTES.DETAILS}/${ROUTES.ID}`,
        component: DetailsComponent,
      },
      {
        path: `${ROUTES.EDIT}/${ROUTES.ID}`,
        component: EditComponent,
      },
      {
        path: ROUTES.REGISTER,
        component: RegisterComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorsRoutingModule { }
