import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, Observable, of, throwError } from 'rxjs';
import { API } from 'src/app/modules/shared/constants/api.constants';
import { Collaborator } from 'src/app/modules/shared/utils/interfaces/collaborator.interface';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Collaborator[] | Object> {
    return this.httpClient.get(API.COLLABORATORS)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }

  getById(id: number): Observable<Collaborator[] | Object> {
    return this.httpClient.get(`${API.COLLABORATORS}/${id}`)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }

  create(collaborator: Collaborator): Observable<Collaborator[] | Object> {
    return this.httpClient.post(API.COLLABORATORS, collaborator)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }

  patch(id: number, collaborator: Collaborator): Observable<Collaborator[] | Object> {
    return this.httpClient.patch(`${API.COLLABORATORS}/${id}`, collaborator)
    .pipe(catchError(error => throwError(() => new Error(error))));
  }
}
