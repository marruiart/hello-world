import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

export abstract class ApiService {
  protected _options = { headers: {} }
  protected httpClient = inject(HttpClient)
  protected jwtService = inject(JwtService)

  constructor() {
    this.jwtService.jwt$.subscribe(token => {
      this._options.headers = new HttpHeaders({ "Authorization": `Bearer ${token}` });
    });
  }

  protected stringifyQueries(queries: { name: string, option: any }[]): string {
    let _queries = "";
    queries.forEach((opt, i) => _queries += `${i == 0 ? "?" : "&"}${opt.name}=${opt.option}`);
    return _queries;
  }


  // CRUD methods

  protected getAll<T>(path: string, queries: { name: string, option: any }[] | null, callback: (res: T) => T): Observable<T> {
    let _queries = ""
    if (queries != null) {
      _queries = this.stringifyQueries(queries);
    }
    return this.httpClient.get<T>(`${environment.API_URL}/api/${path}${_queries}`, this._options)
      .pipe(map(callback), catchError(error => {
        console.log("ERROR getAll");
        console.error(error);
        return of(error);
      }));
  }

  protected get<T>(path: string, id: number, queries: { name: string, option: any }[] | null, callback: (res: T) => T): Observable<T> {
    let _queries = ""
    if (queries != null) {
      _queries = this.stringifyQueries(queries);
    }
    return this.httpClient.get<T>(`${environment.API_URL}/api/${path}/${id}${_queries}`, this._options)
      .pipe(map(callback), catchError(error => {
        console.log("ERROR get");
        console.error(error);
        return of(error);
      }));
  }

  protected add<T>(path: string, body: JSON, callback: (res: T) => T): Observable<T> {
    return this.httpClient.post<T>(`${environment.API_URL}/api/${path}`, body, this._options)
      .pipe(map(callback), catchError(error => {
        console.log("ERROR add");
        console.error(error);
        return of(error);
      }));
  }

  protected update<T>(path: string, id: number, body: JSON, callback: (res: T) => T): Observable<T> {
    return this.httpClient.put<T>(`${environment.API_URL}/api/${path}/${id}`, body, this._options)
      .pipe(map(callback), catchError(error => {
        console.log("ERROR update");
        console.error(error);
        return of(error);
      }));
  }

  protected delete<T>(path: string, id: number, callback: (res: T) => T): Observable<T> {
    return this.httpClient.delete<T>(`${environment.API_URL}/api/${path}/${id}`, this._options)
      .pipe(map(callback), catchError(error => {
        console.log("ERROR delete");
        console.error(error);
        return of(error);
      }));
  }

}