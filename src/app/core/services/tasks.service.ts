import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDo } from '../models/task.interface';
import { ApiService } from './api.service';

let mapTask = (res: any) => {
  return {
    id: res.data.id,
    name: res.data.attributes.name,
    description: res.data.attributes.description,
    assignments: res.data.attributes.assignments?.data
  }
}

let mapTasks = (res: any) => {
  return Array.from(res.data).reduce((prev: ToDo[], taskRes: any): ToDo[] => {
    let _user: ToDo = {
      id: taskRes.id,
      name: taskRes.attributes.name,
      description: taskRes.attributes.description,
      assignments: taskRes.attributes.assignments?.data
    }
    prev.push(_user);
    return prev;
  }, []);
}

@Injectable({
  providedIn: 'root'
})
export class TasksService extends ApiService {
  private _tasks: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);
  public tasks$: Observable<ToDo[]> = this._tasks.asObservable();
  private queries: { name: string, option: any }[] = [
    { name: "populate", option: "assignments.user" }
  ]
  private body: any = (task: ToDo) => {
    return {
      data: {
        name: task.name,
        description: task.description,
        assignments: task.assignments
      }
    }
  }

  constructor(
    private http: HttpClient
  ) {
    super("tasks")
  }

  getAllTasks(): Observable<ToDo[]> {
    return this.getAll<ToDo[]>(this.queries, mapTasks).pipe(tap(res => {
      this._tasks.next(res);
    }));
  }

  getTask(id: number): Observable<ToDo> {
    return this.get<ToDo>(id, this.queries, mapTask);
  }

  addTask(task: ToDo): Observable<ToDo> {
    return this.add<ToDo>(this.body(task), mapTask).pipe(tap(_ => {
      this.getAllTasks().subscribe();
    }));
  }

  updateTask(task: ToDo): Observable<ToDo> {
    return this.update<ToDo>(task.id, this.body(task), mapTask).pipe(tap(_ => {
      this.getAllTasks().subscribe();
    }));
  }

  deleteTask(id: number): Observable<ToDo> {
    return this.delete<ToDo>(id, mapTask).pipe(tap(_ => {
      this.getAllTasks().subscribe();
    }));
  }

  public query(q: string): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(environment.JSON_URL + '/tasks?q=' + q);
  }

}
