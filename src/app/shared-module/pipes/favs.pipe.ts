import { Pipe, PipeTransform } from '@angular/core';
import { Fav } from 'src/app/core/models/fav.interface';
import { User } from 'src/app/core/models/user.interface';

@Pipe({
  name: 'favs'
})
export class FavsPipe implements PipeTransform {

  transform(users: User[] | null, favs: Fav[] | null): User[] {
    /*if ((users as User).id != undefined) {

    } else {
      
    }*/
    let _users: User[] = [...users ?? []];
    if (favs) {
      _users = _users.map(user => {
        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          age: user.age,
          fav: favs?.reduce((prev, fav) => prev || fav.id == user.id, false)
        }
      });
    }
    return _users;
  }

}
