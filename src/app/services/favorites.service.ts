import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fav } from '../components/home/models/fav.interface';
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

  getFav(id: number): Observable<Fav> {
    return new Observable(observer => {
      let fav: Fav | undefined = this._favs.value.find(f => f.id == id);
      observer.next(fav);
      observer.complete();
    })
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
      if (index != -1) {
        favs.splice(index, 1);
        observer.next(this._favs.value[index]);
        this._favs.next(favs);
      } else {
        console.warn(`Usuario con id ${userId} no encontrado en favoritos`);
        observer.error(new UserNotFoundException());
      }
      observer.complete();
    })
  }

}
