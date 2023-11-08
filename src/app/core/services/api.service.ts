import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';
@Injectable(
  { providedIn: 'root' }
)
export abstract class ApiService {
  protected httpClient = inject(HttpClient)
  protected jwtSvc = inject(JwtService)

  constructor() { }

  protected stringifyQueries(queries: { name: string, option: any }[]): string {
    let _queries = "";
    queries.forEach((opt, i) => _queries += `${i == 0 ? "?" : "&"}${opt.name}=${opt.option}`);
    return _queries;
  }

  protected getOptions(url: string, accept = null, contentType = null) {
    let _options = { headers: this.getHeaders(url, accept, contentType) }
    return _options;
  }

  private getHeaders(url: string, accept = null, contentType = null) {
    let _headers: HttpHeaders = new HttpHeaders();
    if (accept) {
      _headers = _headers.append("Accept", accept);
    }
    if (contentType) {
      _headers = _headers.append("Content-Type", contentType);
    }
    if (!url.includes('auth')) {
      _headers = _headers.append("Authorization", `Bearer ${this.jwtSvc.getToken()}`);
    }
    return _headers;
  }


  // CRUD methods

  protected getAll<T>(path: string, queries: { name: string, option: any }[] | null, callback: (res: T) => T): Observable<T> {
    let _queries = ""
    if (queries != null) {
      _queries = this.stringifyQueries(queries);
    }
    const url = `${environment.API_URL}/api/${path}${_queries}`;
    return this.httpClient.get<T>(url, this.getOptions(url))
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
    const url = `${environment.API_URL}/api/${path}/${id}${_queries}`;
    return this.httpClient.get<T>(url, this.getOptions(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR get");
        console.error(error);
        return of(error);
      }));
  }

  public post<T>(path: string, body: JSON, callback: (res: T) => T = (res => res)): Observable<T> {
    const url = `${environment.API_URL}${path}`;
    return this.httpClient.post<T>(url, body, this.getOptions(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR add");
        console.error(error);
        return of(error);
      }));
  }

  protected add<T>(path: string, body: JSON, callback: (res: T) => T): Observable<T> {
    const url = `${environment.API_URL}/api/${path}`;
    return this.httpClient.post<T>(url, body, this.getOptions(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR add");
        console.error(error);
        return of(error);
      }));
  }

  protected update<T>(path: string, id: number, body: JSON, callback: (res: T) => T): Observable<T> {
    const url = `${environment.API_URL}/api/${path}/${id}`;
    return this.httpClient.put<T>(url, body, this.getOptions(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR update");
        console.error(error);
        return of(error);
      }));
  }

  protected delete<T>(path: string, id: number, callback: (res: T) => T): Observable<T> {
    const url = `${environment.API_URL}/api/${path}/${id}`;
    return this.httpClient.delete<T>(url, this.getOptions(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR delete");
        console.error(error);
        return of(error);
      }));
  }

}