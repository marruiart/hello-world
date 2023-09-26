import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surnameInitial'
})
export class SurnameInitialPipe implements PipeTransform {

  transform(apellido: string): unknown {
    return apellido.charAt(0).toUpperCase();
  }

}
