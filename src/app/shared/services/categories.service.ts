import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Technology } from '../models/technology';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API: string = 'https://thirsty-swirles-6a035c.netlify.app/.netlify/functions/hello';

  constructor(private http: HttpClient) { }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.API}`)
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
