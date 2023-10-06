import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surnameInitial'
})
export class SurnameInitialPipe implements PipeTransform {

  transform(apellido?: string): string {
    if (apellido)
      return apellido.charAt(0).toUpperCase();
    return ""
  }

}
