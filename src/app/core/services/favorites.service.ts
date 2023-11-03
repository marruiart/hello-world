import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fav } from '../models/fav.interface';
import { UserNotFoundException } from './users.service';

export interface FavoritesInterface {
  // Métodos de la interfaz para el CRUD
  getAll(): Observable<Fav[]>;
  getFav(id: number): Observable<Fav>;
  addFav(userId: number): Observable<Fav>;
  deleteFav(userId: number): Observable<Fav>;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService implements FavoritesInterface {
  private _favs: BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([]);
  public favs$: Observable<Fav[]> = this._favs.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<Fav[]> {
    return this.httpClient.get<Fav[]>(`${environment.JSON_URL}/favs`).pipe(tap(favs => {
      this._favs.next(favs);
    }))
  }

  getFav(id: number): Observable<Fav> {
    return this.httpClient.get<Fav>(`${environment.JSON_URL}/favs/${id}`);
  }

  addFav(userId: number): Observable<Fav> {
    let json = {"id": userId};
    return this.httpClient.post<Fav>(`${environment.JSON_URL}/favs`, json).pipe(tap(_ => {
      let favFound = this._favs.value.find(u => u.id == userId);
      let favs = [...this._favs.value];
      let fav = { id: userId };
      if (favFound == undefined) {
        favs.push(fav);
      }
      this._favs.next(favs);
    }));
  }

  deleteFav(userId: number): Observable<Fav> {
    return this.httpClient.delete<Fav>(`${environment.JSON_URL}/favs/${userId}`).pipe(tap(_ => {
      let favs = [...this._favs.value];
      var index = favs.findIndex(fav => userId == fav.id);
      favs.splice(index, 1);
      this._favs.next(favs);
    }));
  }

}
