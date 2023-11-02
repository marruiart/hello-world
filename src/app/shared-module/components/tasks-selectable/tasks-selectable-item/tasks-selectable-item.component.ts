import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToDo } from 'src/app/core/models/task.interface';

@Component({
  selector: 'app-tasks-selectable-item',
  templateUrl: './tasks-selectable-item.component.html',
  styleUrls: ['./tasks-selectable-item.component.scss'],
})
export class TasksSelectableItemComponent implements OnInit {

  private _task: ToDo | undefined;

  @Input('task') set task(_task: ToDo | undefined) {
    this._task = _task;
  }

  @Output('clicked') clicked = new EventEmitter();

  get task(): ToDo | undefined {
    return this._task;
  }

  constructor() { }

  ngOnInit() { }

  onTaskClicked() {
    this.clicked.emit(this._task);
  }
}
