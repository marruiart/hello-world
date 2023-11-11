import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { ToDo } from 'src/app/core/models/task.interface';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  public form: FormGroup;
  private _task: ToDo | null = null;
  private _user: User | null = null;

  @Input() mode: 'New' | 'Edit' = 'New';
  @Input() set user(_user: User | null) {
    if (_user) {
      this._user = _user;
      this.mode = 'Edit';
      /*this.form.controls['avatar'].setValue(_user.avatar);*/
      this.form.controls['id'].setValue(_user.id);
      this.form.controls['user_id'].setValue(_user.user_id);
      this.form.controls['nickname'].setValue(_user.nickname);
      this.form.controls['name'].setValue(_user.name);
      this.form.controls['surname'].setValue(_user.surname);
      this.form.controls['age'].setValue(_user.age);
    }
  }

  @Input() set task(_task: ToDo | null) {
    if (_task) {
      this._task = _task;
      this.form.controls['task_id'].setValue(this._task.id);
    }
  }

  get user(): User | null {
    return this._user;
  }

  get task(): ToDo | null {
    return this._task;
  }

  constructor(
    private _modal: ModalController,
    private fb: FormBuilder,
    public platform: Platform,
  ) {
    //console.log(this.platform);
    this.form = this.fb.group({
      id: [null],
      user_id: [null],
      nickname: ['', Validators.required],
      avatar: [null],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      task_id: [null]
    })
  }

  onSubmit() {
    let taskId = this.form.value.task_id;
    this.form.value.task_id = taskId == undefined ? null : taskId;
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
