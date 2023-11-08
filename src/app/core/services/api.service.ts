import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDo } from '../models/task.interface';
import { JwtService } from './auth/jwt.service';
import { HttpClientProvider } from './http/http-client.provider';
@Injectable(
  { providedIn: 'root' }
)
export abstract class ApiService {
  protected http = inject(HttpClientProvider)
  protected jwtSvc = inject(JwtService)

  constructor() { }

  protected getHeader(url: string, accept = null, contentType = null) {
    var jsonHeader: any = {};
    if (accept) {
      jsonHeader['Accept'] = accept;
    }
    if (contentType) {
      jsonHeader['Content-Type'] = contentType;
    }
    if (!url.includes('auth')) {
      jsonHeader['Authorization'] = `Bearer ${this.jwtSvc.getToken()}`;
    }
    return jsonHeader;
  }

  protected getUrl(path: string, id: number | null = null) {
    return `${environment.API_URL}${path}${id ? `/${id}` : ''}`;
  }

  // CRUD methods

  protected getAll<T>(
    path: string,
    queries: { [query: string]: string } = {},
    callback: ((res: T) => T)
  ): Observable<T> {
    const url = this.getUrl(path);
    return this.http.get<T>(url, queries, this.getHeader(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR getAll");
        console.error(error);
        return of(error);
      }));
  }

  protected get<T>(
    path: string,
    callback: ((res: T) => T),
    queries: { [query: string]: string } = {},
    id: number | null = null
  ): Observable<T> {
    // TODO añadir /api en el path

    const url = this.getUrl(path, id);
    return this.http.get<T>(url, queries, this.getHeader(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR get");
        console.error(error);
        return of(error);
      }));
  }

  public post<T>(path: string, body: JSON, callback: ((res: T) => T) = (res => res)): Observable<T> {
    const url = `${environment.API_URL}${path}`;
    return this.http.post<T>(url, body, this.getHeader(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR add");
        console.error(error);
        return of(error);
      }));
  }

  protected add<T>(path: string, body: JSON, callback: ((res: T) => T)): Observable<T> {
    const url = `${environment.API_URL}/api/${path}`;
    return this.http.post<T>(url, body, this.getHeader(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR add");
        console.error(error);
        return of(error);
      }));
  }

  protected update<T>(path: string, id: number, body: JSON, callback: ((res: T) => T)): Observable<T> {
    const url = `${environment.API_URL}/api/${path}/${id}`;
    return this.http.put<T>(url, body, this.getHeader(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR update");
        console.error(error);
        return of(error);
      }));
  }

  protected delete<T>(
    path: string,
    callback: ((res: T) => T),
    id: number
  ): Observable<T> {

    const url = this.getUrl(path, id);
    return this.http.delete<T>(url, this.getHeader(url))
      .pipe(map(callback), catchError(error => {
        console.log("ERROR delete");
        console.error(error);
        return of(error);
      }));
  }

}