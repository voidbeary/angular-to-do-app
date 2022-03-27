import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToDo } from '../todo.model';
import { TodosResponse } from '../todos-response.model';

@Injectable({
  providedIn: 'root',
})
export class ListItemsService {
  constructor(private http: HttpClient) {}
  createTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(`${environment.apiUrl}/todos`, todo);
  }
  getTodos(): Observable<TodosResponse> {
    return this.http.get(`${environment.apiUrl}/todos`);
  }
  deleteTodo(id: string): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/todos/${id}`);
  }
}
