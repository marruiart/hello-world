import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  add(token: string): Observable<string> {
    return new Observable<string>(observer => {
      Preferences.set({
        key: 'jwtToken',
        value: JSON.stringify(token)
      }).then((_) => {
        observer.next(token);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

  get(): Observable<string> {
    return new Observable<string>(observer => {
      Preferences.get({ key: 'jwtToken' })
        .then((token: any) => {
          if (token['value']) {
            if (token == '' || token == null) {
              observer.error('No token');
            } else {
              observer.next(token);
              observer.complete();
            }
          } else {
            observer.error('No token');
          }
        }).catch((error: any) => observer.next(error));
    });
  }

}