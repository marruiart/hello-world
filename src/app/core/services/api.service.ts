import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

export class ApiService {
  private _path: string
  protected _options = { headers: {} }
  protected httpClient = inject(HttpClient)
  protected jwtService = inject(JwtService)

  constructor(
    path: string,
  ) {
    this._path = path;
    this.jwtService.jwt$.subscribe(token => {
      this._options.headers = new HttpHeaders({ "Authorization": `Bearer ${token}` });
    });
  }

  getAll<T>(path: string = this._path, callback: (res: T) => T): Observable<T> {
    return this.httpClient.get<T>(`${environment.API_URL}/api/${this._path}?populate=user_id`, this._options).pipe(map(callback));
  }

  get<T>(id: number, callback: (res: T) => T): Observable<T> {
    return this.httpClient.get<T>(`${environment.API_URL}/api/${this._path}/${id}`, this._options).pipe(map(callback));
  }

  add<T>(body: JSON, callback: (res: T) => T): Observable<T> {
    return this.httpClient.post<T>(`${environment.API_URL}/api/${this._path}`, body, this._options).pipe(map(callback));
  }

  update<T>(id: number, body: JSON, callback: (res: T) => T): Observable<T> {
    return this.httpClient.put<T>(`${environment.API_URL}/api/${this._path}/${id}`, body, this._options).pipe(map(callback));
  }

  delete<T>(id: number, callback: (res: T) => T): Observable<T> {
    return this.httpClient.delete<T>(`${environment.API_URL}/api/${this._path}/${id}`, this._options).pipe(map(callback));
  }

}