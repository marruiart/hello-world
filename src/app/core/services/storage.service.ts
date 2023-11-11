import { Injectable } from '@angular/core';
import { Dexie, PromiseExtended, Table } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends Dexie {
  loginAuth!: Table<any, any>;

  constructor() {
    super('DexieDB');
    this.version(1).stores({
      loginAuth: 'id, token',
    });
  }

   add(token: string): PromiseExtended<any> {
    return this.loginAuth.put({ 'id': 0, 'token': token }, 'token')
      .catch((err) =>
        console.error(err)
      )
  }

  async get(): Promise<any> {
    return await this.loginAuth.get({ id: 0 })
      .catch((err) =>
        console.error(err)
      );
  }

}