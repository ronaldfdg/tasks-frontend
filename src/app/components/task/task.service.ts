import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private urlEndPoint: string = "http://localhost:8080/api/tasks";

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.urlEndPoint}/${id}`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.urlEndPoint);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.urlEndPoint, task, {headers: this.httpHeaders});
  }

  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.urlEndPoint}/${task.id}`, task, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

  getPendingTasks(tasks: Task[]): Task[]{
    let pendingTasks: Task[] = [];
    for(let task of tasks){
      if(task.pending){
        pendingTasks.push(task);
      }
    }
    return pendingTasks;
  }

}
