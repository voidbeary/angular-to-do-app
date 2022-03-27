import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItemsService } from '../services/todos.service';
import { ToDo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Output() todosUpdated: EventEmitter<void> = new EventEmitter();
  @Input() todos: ToDo[] = [];

  constructor(private todoService: ListItemsService) {}

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todosUpdated.emit();
    });
  }

  ngOnInit(): void {}
}
