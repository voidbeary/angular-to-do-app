import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

type ToDo = {
  _id: string;
  title: string;
};
type Response = {
  data?: {
    todos?: ToDo[];
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  todos: ToDo[] = [];

  constructor(private http: HttpClient) {}

  getTodos() {
    this.http.get<Response>(`${environment.apiUrl}/todos`).subscribe((res) => {
      this.todos = res?.data?.todos || [];
    });
  }
}
