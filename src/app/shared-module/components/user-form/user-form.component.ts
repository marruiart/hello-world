import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { ToDo } from 'src/app/core/models/task.interface';
import { User } from 'src/app/core/models/user.interface';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  public form: FormGroup;
  public task?: ToDo;
  private _user: User | null = null;

  @Input() mode: 'New' | 'Edit' = 'New';
  @Input() set user(_user: User | null) {
    if (_user) {
      this._user = _user;
      this.mode = 'Edit';
      this.form.controls['photo'].setValue(_user.photo);
      this.form.controls['id'].setValue(_user.id);
      this.form.controls['name'].setValue(_user.name);
      this.form.controls['surname'].setValue(_user.surname);
      this.form.controls['age'].setValue(_user.age);
      if (_user.task_id) {
        this.tasksService.getTask(_user.task_id[0]).subscribe(res => {
          this.task = res;
        })
      }
    }
  }

  get user(): User | null {
    return this._user;
  }

  constructor(
    private _modal: ModalController,
    private fb: FormBuilder,
    public platform: Platform,
    private tasksService: TasksService
  ) {
    console.log(this.platform);
    this.form = this.fb.group({
      id: [null],
      photo: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: [0, [Validators.required, this.validateAge()]],
      task_id: ['']
    })
  }

  onSubmit() {
    this._modal.dismiss(this.form.value, "submit");
  }

  onCancel() {
    this._modal.dismiss(null, "cancel");
  }

  onDelete() {
    this._modal.dismiss(this.form.value, 'delete')
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
