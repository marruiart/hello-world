import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fav } from '../models/fav.interface';
import { User } from '../models/user.interface';

export interface FavoritesInterface {
  // Métodos de la interfaz para el CRUD
  getAll(): Observable<Fav[]>;
  /*   addFav(fav: Favorite): Observable<Favorite>;
    deleteFav(fav: User): Observable<Favorite>; */
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService implements FavoritesInterface {
  private _favs: BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([]);
  public favs$: Observable<Fav[]> = this._favs.asObservable();

  constructor() { }
  getAll(): Observable<Fav[]> {
    return new Observable(observer => {
      setTimeout(() => {
        let favs: Fav[] = [
          { id: 0 },
          { id: 2 },
          { id: 4 }
        ]
        this._favs.next(favs);
        observer.next(favs);
        observer.complete();
      }, 2000);
    });
  }

  addFav(userId: number): Observable<Fav> {
    return new Observable(observer => {
      let favFound = this._favs.value.find(u => u.id == userId);
      let favs = [...this._favs.value];
      let fav = { id: userId };
      if (favFound == undefined) {
        favs.push(fav);
      }
      this._favs.next(favs);
      observer.next(fav);
      observer.complete();
    })
  }

  deleteFav(userId: number): Observable<Fav> {
    return new Observable(observer => {
      let favs = [...this._favs.value];
      var index = favs.findIndex(fav => userId == fav.id);
      if (index == -1) {
        observer.error();
      } else {
       favs.splice(index, 1);
      }
      this._favs.next(favs);
      observer.next(favs[index]);
      observer.complete();
    })
  }

  deleteAll(): Observable<void> {
    return new Observable(observer => {

    });
  }


}
