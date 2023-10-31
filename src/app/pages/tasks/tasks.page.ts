import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/core/models/task.interface';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  public loading: boolean = false;

  constructor(
    public tasksService: TasksService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.tasksService.getAll().subscribe((_) => {
      this.loading = false;
    });
  }

  public onEditClicked(task: ToDo) {

  }

  public onDeleteClicked(task: ToDo) {
    this.tasksService.deleteTask(task).subscribe();
  }

}
