import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API } from 'src/app/modules/shared/constants/api.constants';
import { CollaboratorResponse } from 'src/app/modules/shared/utils/interfaces/collaborator-response.interface';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';
import { CollaboratorsResponse } from 'src/app/modules/shared/utils/interfaces/collaborators-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CollaboratorsResponse | Object> {
    return this.httpClient.get(API.COLLABORATORS)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }

  getById(id: number): Observable<CollaboratorResponse | Object> {
    return this.httpClient.get(`${API.COLLABORATORS}/${id}`)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }

  create(collaborator: Collaborator): Observable<CollaboratorResponse | Object> {
    return this.httpClient.post(API.COLLABORATORS, collaborator)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }

  patch(id: number, collaborator: Collaborator): Observable<CollaboratorResponse | Object> {
    return this.httpClient.patch(`${API.COLLABORATORS}/${id}`, collaborator)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${API.COLLABORATORS}/${id}`)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }
}
