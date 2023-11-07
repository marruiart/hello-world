import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Assignment } from '../models/assignment.interface';
import { ApiService } from './api.service';

let mapAssignment = (res: any) => {
  return {
    id: res.data.id,
    user_id: res.data.attributes.user.data.id,
    task_id: res.data.attributes.task.data.id,
    issue_date: res.data.attributes.issue_date
  }
}

let mapAssignments = (res: any) => {
  return Array.from(res.data).reduce((prev: Assignment[], assignmentRes: any): Assignment[] => {
    let _assignment: Assignment = {
      id: assignmentRes.id,
      user_id: assignmentRes.attributes.user.data.id,
      task_id: assignmentRes.attributes.task.data.id,
      issue_date: assignmentRes.attributes.issue_date
    }
    prev.push(_assignment);
    return prev;
  }, []);
}

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService extends ApiService {
  private path: string = "assignments";
  private _assignments: BehaviorSubject<Assignment[]> = new BehaviorSubject<Assignment[]>([]);
  public assignments$: Observable<Assignment[]> = this._assignments.asObservable();
  private queries: { name: string, option: any }[] = [
    { name: "populate", option: "user,task" }
  ]

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  getAllAssignments(): Observable<Assignment[]> {
    return this.getAll<Assignment[]>(this.path, this.queries, mapAssignments).pipe(tap(res => {
      this._assignments.next(res);
    }));;
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.get<Assignment>(this.path, id, this.queries, mapAssignment);
  }

  getAssigmentsByUser(userId: number): Observable<Assignment[]> {
    let _queries = [...this.queries];
    _queries.push({ name: "user_id", option: userId });
    return this.http.get<Assignment[]>(`${environment.API_URL}/api/assignments${this.stringifyQueries(this.queries)}`, this._options)
      .pipe(
        map(mapAssignments),
        catchError(err => {
          console.error(err);
          return of(err)
        }));
  }

  getAssigmentsByTask(taskId: number): Observable<Assignment[]> {
    let _queries = [...this.queries];
    _queries.push({ name: "task_id", option: taskId });
    return this.http.get<Assignment[]>(`${environment.API_URL}/api/assignments${this.stringifyQueries(this.queries)}`, this._options)
      .pipe(
        map(mapAssignments),
        catchError(err => {
          console.error(err);
          return of(err)
        }));;
  }

  addAssignment(assignment: Assignment): Observable<Assignment> {
    let body: any = {
      data: {
        task_id: assignment.task_id,
        user_id: assignment.user_id,
        issue_date: assignment.issue_date
      }
    }
    return this.add<Assignment>(this.path, body, mapAssignment).pipe(tap(_ => {
      this.getAllAssignments().subscribe();
    }));
  }

  updateAssignment(assignment: Assignment) {
    let body: any = {
      data: {
        task_id: assignment.task_id,
        user_id: assignment.user_id,
        issue_date: assignment.issue_date
      }
    }
    return this.update<Assignment>(this.path, assignment.id, body, mapAssignment).pipe(tap(_ => {
      this.getAllAssignments().subscribe();
    }));
  }

  deleteAssignment(id: number): Observable<Assignment> {
    return this.delete<Assignment>(this.path, id, mapAssignment).pipe(tap(_ => {
      this.getAllAssignments().subscribe();
    }));;
  }

}
