import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assignment } from '../models/assignment.interface';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private _assignments: BehaviorSubject<Assignment[]> = new BehaviorSubject<Assignment[]>([]);
  public assignments$: Observable<Assignment[]> = this._assignments.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.JSON_URL}/assignments`).pipe(tap(res => {
      this._assignments.next(res);
    }));
  }

  getAssigmentByUser(userId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.JSON_URL}/assignments?user_id=${userId}`);
  }

  getAssigmentByTask(taskId: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.JSON_URL}/assignments?task_id=${taskId}`);
  }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(`${environment.JSON_URL}/assignments`, assignment).pipe(tap(_ => {
      this.getAll();
    }));
  }

  deleteAssignment(id: number): Observable<Assignment> {
    return this.http.delete<Assignment>(`${environment.JSON_URL}/assignments/${id}`).pipe(tap(_ => {
      this.getAll();
    }));
  }

  updateAssignmentByUser(assignment: Assignment, userId: number): Observable<Assignment> {
    return this.http.patch<Assignment>(`${environment.JSON_URL}/assignments?user_id=${userId}`, assignment).pipe(tap(_ => {
      this.getAll();
    }));
  }

  updateAssignmentByTask(assignment: Assignment, taskId: number): Observable<Assignment> {
    return this.http.patch<Assignment>(`${environment.JSON_URL}/assignments?task_id=${taskId}`, assignment).pipe(tap(_ => {
      this.getAll();
    }));
  }

}
