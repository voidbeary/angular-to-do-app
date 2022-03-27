import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type ToDo = {
  _id: string;
  title: string;
};
@Injectable({
  providedIn: 'root',
})
export class ListItemsService {
  constructor(private http: HttpClient) {}
  createTodo(todo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(`/api/todos`, todo);
  }
}
