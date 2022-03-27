import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ListItemsService } from '../services/todos.service';

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
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  @Output() todoUpdated: EventEmitter<void> = new EventEmitter();
  todos: ToDo[] = [];
  myForm: FormGroup = new FormGroup({
    title: new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.pattern('[^s].*')],
    }),
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private todoService: ListItemsService
  ) {}

  getTodos() {
    this.http.get<Response>(`${environment.apiUrl}/todos`).subscribe((res) => {
      this.todos = res?.data?.todos || [];
    });
  }

  createTodo() {
    const todo = this.myForm.getRawValue();
    this.todoService.createTodo(todo).subscribe(() => {
      this.myForm.reset();
      this.getTodos();
    });
  }
  deleteTodo(id: string) {
    this.http.delete(`${environment.apiUrl}/todos/${id}`).subscribe(() => {
      this.getTodos();
    });
  }

  get newTodo() {
    return this.myForm.get('title');
  }

  ngOnInit(): void {
    this.getTodos();
    this.myForm = this.fb.group({
      title: '',
    });
  }
}
