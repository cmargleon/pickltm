import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Technology } from '../models/technology';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private API: string = 'https://thirsty-swirles-6a035c.netlify.app/.netlify/functions/hello';

  tech!: Technology;

  constructor(private http: HttpClient) { }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<any[]>(`${this.API}`).pipe(map(data => data.map(v => {
      let technology = {
        name: v.technology,
        selected: false,
        icon: ""
      }
      return technology;
    })));

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
