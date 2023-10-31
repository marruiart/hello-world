import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

export const PICTURE_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PictureSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-picture-selectable',
  templateUrl: './picture-selectable.component.html',
  styleUrls: ['./picture-selectable.component.scss'],
  providers:[PICTURE_SELECTABLE_VALUE_ACCESSOR]
})
export class PictureSelectableComponent implements OnInit, ControlValueAccessor, OnDestroy {
  private _photo = new BehaviorSubject("");
  public photo$ = this._photo.asObservable();
  isDisabled: boolean = false;
  hasValue: boolean = false;

  propagateChange = (obj: any) => {
  }

  constructor(
    private pictureModal: ModalController
  ) { }

  // Métodos de la interfaz ControlValueAccessor
  writeValue(obj: any): void {
    if (obj) {
      this.hasValue = true;
      this._photo.next(obj);
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
    this._photo.complete();
  }

  private changePicture(photo: string) {
    this.hasValue = photo != '';
    this._photo.next(photo);
    this.propagateChange(photo);
  }


  public onChangePicture(event: Event, fileLoader: HTMLInputElement) {
    event.stopPropagation();
    fileLoader.onchange = () => {
      if (fileLoader.files && fileLoader.files?.length > 0) {
        let file = fileLoader.files[0];
        let reader = new FileReader();
        reader.onload = () => {
          this.changePicture(reader.result as string);
        };
        reader.onerror = (error) => {
          console.log(error);
        }
        reader.readAsDataURL(file);
      }
    }
    fileLoader.click();
  }

  onDeletePicture(event: Event) {
    event.stopPropagation();
    this.changePicture('');
  }

  close() {
    this.pictureModal?.dismiss();
  }
}
