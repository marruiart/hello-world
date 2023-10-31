import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDo } from '../models/task.interface';

export interface TaskInterface {
  // Métodos de la interfaz para el CRUD
  getAll(): Observable<ToDo[]>;
  getTask(id: number): Observable<ToDo>;
  addTask(task: ToDo): Observable<ToDo>
  updateTask(task: ToDo): Observable<ToDo>;
  deleteTask(task: ToDo): Observable<ToDo>;
  deleteAll(): Observable<void>
}

@Injectable({
  providedIn: 'root'
})
export class TasksService implements TaskInterface {
  private _tasks: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>([]);
  public tasks$: Observable<ToDo[]> = this._tasks.asObservable();
  private _id: number = 0;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(`${environment.API_URL}/tasks`).pipe(tap(res => {
      this._tasks.next(res);
    }));
  }

  getTask(id: number): Observable<ToDo> {
    return this.httpClient.get<ToDo>(`${environment.API_URL}/tasks/${id}`);
  }

  addTask(task: ToDo): Observable<ToDo> {
    return this.httpClient.post<ToDo>(`${environment.API_URL}/tasks`, task).pipe(tap(_ => {
      this.getAll().subscribe();
    }));
  }

  updateTask(task: ToDo): Observable<ToDo> {
    return this.httpClient.patch<ToDo>(`${environment.API_URL}/tasks/${task.id}`, task).pipe(tap(_ => {
      this.getAll().subscribe();
    }));
  }

  deleteTask(task: ToDo): Observable<ToDo> {
    return this.httpClient.delete<ToDo>(`${environment.API_URL}/tasks/${task.id}`).pipe(tap(_ => {
      this.getAll().subscribe();
    }));
  }

  deleteAll(): Observable<void> {
    return new Observable<void>(observable => {
      this.getAll().subscribe(_tasks => {
        _tasks.forEach(t => this.deleteTask(t).subscribe());
      });
      observable.complete();
    });
  }

  public query(q:string):Observable<ToDo[]>{
    // Si coincide el tipo de datos que recibo con mi interfaz
    return this.httpClient.get<ToDo[]>(environment.API_URL+'/tasks?q='+q);
  }

}
