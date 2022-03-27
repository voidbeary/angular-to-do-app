import { Component } from '@angular/core';
import { ListItemsService } from './services/todos.service';
import { ToDo } from './todo.model';
import { TodosResponse } from './todos-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  todos: ToDo[] = [];

  constructor(private todoService: ListItemsService) {}

  getTodos() {
    this.todoService.getTodos().subscribe((res: TodosResponse) => {
      this.todos = res?.data?.todos || [];
    });
  }

  ngOnInit(): void {
    this.getTodos();
  }
}
