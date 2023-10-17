import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/components/home/models/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  public userForm: FormGroup = this.fb.group({
    name: [null, Validators.required],
    surname: [null, Validators.required],
    age: [null, [Validators.required, this.validateAge()]]
  })

  public formInput!: String;

  constructor(
    private addUserModal: ModalController,
    private userService: UsersService,
    private fb: FormBuilder
  ) { }

  onApply() {
    let user: User = {
      id: this.userService.getNextId(),
      name: this.userForm.value.name,
      surname: this.userForm.value.surname,
      age: this.userForm.value.age,
      fav: false
    }
    // apply es el rol que tiene este modal
    this.addUserModal.dismiss(user, "apply");
  }

  validateAge(): { [key: string]: any } | null {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value && control.value < 18) {
        return { 'ageInvalid': true };
      }
      return null;
    }
  }

}
