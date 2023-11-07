import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonPopover } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ToDo } from 'src/app/core/models/task.interface';
import { User } from 'src/app/core/models/user.interface';
import { AssignmentsService } from 'src/app/core/services/assignments.service';
import { TasksService } from 'src/app/core/services/tasks.service';

export const TASK_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TasksSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-tasks-selectable',
  templateUrl: './tasks-selectable.component.html',
  styleUrls: ['./tasks-selectable.component.scss'],
  providers: [TASK_SELECTABLE_VALUE_ACCESSOR]
})
export class TasksSelectableComponent implements OnInit, ControlValueAccessor {

  taskSelected: ToDo | undefined;
  disabled: boolean = true;
  tasks: ToDo[] = [];
  private _user: User | null = null;

  @Input() set user(_user: User | null) {
    this._user = _user;
    // TODO getUserTasks() -> UsersService
    if (this._user) {
      let _taskRes = this._user.assignments[0]?.attributes.task.data;
      if (_taskRes) {
        let _task: ToDo = {
          id: _taskRes.id,
          name: _taskRes.attributes.name,
          description: _taskRes.attributes.description
        }
        this.taskSelected = _task
      }
    }
  }

  propagateChange = (obj: any) => { }

  constructor(
    private tasksService: TasksService,
  ) { }

  ngOnInit() { }

  writeValue(obj: any): void {
    this.selectTask(obj, true);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async onLoadTasks() {
    this.tasks = await lastValueFrom(this.tasksService.getAllTasks());
  }

  private async selectTask(id: number | undefined, propagate: boolean = false) {
    if (id) {
      this.taskSelected = await lastValueFrom(this.tasksService.getTask(id));
    } else {
      this.taskSelected = undefined;
    }
    if (propagate) {
      this.propagateChange(this.taskSelected?.id);
    }
  }

  onTaskClicked(popover: IonPopover, task: ToDo) {
    this.selectTask(task.id, true);
    popover.dismiss();
  }

  private async filter(value: string) {
    const query = value;
    const tasks = await lastValueFrom(this.tasksService.query(query));
    this.tasks = tasks.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));
  }

  onFilter(evt: any) {
    this.filter(evt.detail.value);
  }

  clearSearch(input: IonInput) {
    input.value = "";
    this.filter("");
  }

  deselect(popover: IonPopover | null = null) {
    this.selectTask(undefined, true);
    if (popover) {
      popover.dismiss();
    }
  }

}
