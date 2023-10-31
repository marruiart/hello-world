import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from 'src/app/core/models/task.interface';
import { User } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.scss'],
})
export class TaskInfoComponent {
  @Input() task: ToDo | null = null;
  public user: User | null = null;
  @Output() onEditClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  public onEditClick(event: Event) {
    this.onEditClicked.emit();
    event.stopPropagation();
  }

  public onDeleteClick(event: Event) {
    this.onDeleteClicked.emit();
    event.stopPropagation();
  }

}
