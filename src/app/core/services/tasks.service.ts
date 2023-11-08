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
  private path: string = "tasks";
  private _tasks: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);
  public tasks$: Observable<ToDo[]> = this._tasks.asObservable();
  private queries: { [query: string]: string } = { "populate": "assignments.user" };
  private body: any = (task: ToDo) => {
    return {
      data: {
        name: task.name,
        description: task.description,
        assignments: task.assignments
      }
    }
  }

  getAllTasks(): Observable<ToDo[]> {
    return this.getAll<ToDo[]>(this.path, this.queries, mapTasks).pipe(tap(res => {
      this._tasks.next(res);
    }));
  }

  getTask(id: number): Observable<ToDo> {
    return this.get<ToDo>(this.path, mapTask, this.queries, id);
  }

  addTask(task: ToDo): Observable<ToDo> {
    return this.add<ToDo>(this.path, this.body(task), mapTask).pipe(tap(_ => {
      this.getAllTasks().subscribe();
    }));
  }

  updateTask(task: ToDo): Observable<ToDo> {
    return this.update<ToDo>(this.path, task.id, this.body(task), mapTask).pipe(tap(_ => {
      this.getAllTasks().subscribe();
    }));
  }

  deleteTask(id: number): Observable<ToDo> {
    return this.delete<ToDo>(this.path, mapTask, id).pipe(tap(_ => {
      this.getAllTasks().subscribe();
    }));
  }

  public query(q: string): Observable<ToDo[]> {
    const query = { "q": q };
    return this.http.get<ToDo[]>(environment.JSON_URL + '/tasks', query, {});
  }

}
