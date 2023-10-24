import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToDo } from '../models/task.interface';

export interface TaskInterface {
  // Métodos de la interfaz para el CRUD
  getAll(): Observable<ToDo[]>;
  getTask(id: number): Observable<ToDo>;
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

  constructor() { }

  getAll(): Observable<ToDo[]> {
    return new Observable(observer => {
      let tasks: ToDo[] = [
        { id: 0, name: "Estudiar Angular", description: "Crear un servicio de tareas", date: new Date(), userId: 0 },
        { id: 1, name: "Perros", description: "Sacar a los perros", date: new Date(), userId: 3 },
        { id: 2, name: "Prototipado de app", description: "Crear diseño figma", date: new Date(), userId: 1 },
      ]
      this._id = 2;
      this._tasks.next(tasks);
      observer.next(tasks);
      observer.complete();
    })
  }
  getTask(id: number): Observable<ToDo> {
    throw new Error('Method not implemented.');
  }
  updateTask(task: ToDo): Observable<ToDo> {
    throw new Error('Method not implemented.');
  }
  deleteTask(task: ToDo): Observable<ToDo> {
    throw new Error('Method not implemented.');
  }
  deleteAll(): Observable<void> {
    throw new Error('Method not implemented.');
  }

}
