import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';

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

  async add(token: string) {
    await this.loginAuth.add({ 'id': 0, 'token': token }, 'token')
      .catch((err) =>
        console.error(err)
      )
  }

  async get() {
    return await this.loginAuth.get({ id: 0 });
  }

}