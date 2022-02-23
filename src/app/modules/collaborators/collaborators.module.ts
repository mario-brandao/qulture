import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorsRoutingModule } from './collaborators-routing.module';
import { CollaboratorsComponent } from './collaborators.component';
import { SharedModule } from '../shared/shared.module';
import { TableComponent } from './components/table/table.component';
import { DetailsComponent } from './components/details/details.component';
import { RegisterComponent } from './components/register/register.component';
import { EditComponent } from './components/edit/edit.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    CollaboratorsComponent,
    TableComponent,
    DetailsComponent,
    RegisterComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    CollaboratorsRoutingModule,
    SharedModule,
  ]
})
export class CollaboratorsModule { }
