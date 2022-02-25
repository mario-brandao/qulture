import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API } from 'src/app/modules/shared/constants/api.constants';
import { GLOBAL } from 'src/app/modules/shared/constants/global.constants';
import { Comment } from 'src/app/modules/shared/utils/interfaces/comment';
import { CommentResponse } from 'src/app/modules/shared/utils/interfaces/comment-response.interface';
import { NewCommentPayload } from 'src/app/modules/shared/utils/interfaces/new-comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getByCollaborator(id: number): Observable<CommentResponse | Object> {
    return this.httpClient.get(`${API.COLLABORATORS}/${id}/${GLOBAL.COMMENTS}`)
    .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }

  getById(id: number): Observable<Comment[] | Object> {
    return this.httpClient.get(`${API.COMMENTS}/${id}`)
    .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }

  create(comment: NewCommentPayload): Observable<Comment[] | Object> {
    return this.httpClient.post(API.COMMENTS, comment)
    .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }

  patch(id: number, comment: NewCommentPayload): Observable<Comment | Object> {
    return this.httpClient.patch(`${API.COMMENTS}/${id}`, comment)
    .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${API.COMMENTS}/${id}`)
    .pipe(catchError((error) => throwError(() => new Error(error.message))));
  }
}
