import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

export const PICTURE_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AvatarSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-avatar-selectable',
  templateUrl: './avatar-selectable.component.html',
  styleUrls: ['./avatar-selectable.component.scss'],
  providers:[PICTURE_SELECTABLE_VALUE_ACCESSOR]
})
export class AvatarSelectableComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private _avatar = new BehaviorSubject("");
  public avatar$ = this._avatar.asObservable();
  isDisabled: boolean = false;
  hasValue: boolean = false;

  propagateChange = (obj: any) => {
  }

  constructor(
    private avatarModal: ModalController
  ) { }

  // Métodos de la interfaz ControlValueAccessor
  writeValue(obj: any): void {
    if (obj) {
      this.hasValue = true;
      this._avatar.next(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  ///////////////////////////

  ngOnInit() { }

  ngOnDestroy(): void {
    this._avatar.complete();
  }

  private changeAvatar(avatar: string) {
    this.hasValue = avatar != '';
    this._avatar.next(avatar);
    this.propagateChange(avatar);
  }


  public onChangeAvatar(event: Event, fileLoader: HTMLInputElement) {
    event.stopPropagation();
    fileLoader.onchange = () => {
      if (fileLoader.files && fileLoader.files?.length > 0) {
        let file = fileLoader.files[0];
        let reader = new FileReader();
        reader.onload = () => {
          this.changeAvatar(reader.result as string);
        };
        reader.onerror = (error) => {
          console.log(error);
        }
        reader.readAsDataURL(file);
      }
    }
    fileLoader.click();
  }

  onDeleteAvatar(event: Event) {
    event.stopPropagation();
    this.changeAvatar('');
  }

  close() {
    this.avatarModal?.dismiss();
  }
}
