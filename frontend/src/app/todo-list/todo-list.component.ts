import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ListItemsService } from '../services/list-items.service';

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
  todos: ToDo[] = [];
  myForm: FormGroup = new FormGroup({ title: new FormControl() });

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
    this.todoService.createTodo(todo).subscribe(
      console.log
      //   () => {
      //   this.todoUpdated.emit();
      //   this.resetTodo();
      // }
    );
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: '',
    });

    this.myForm.valueChanges.subscribe(console.log);
  }
}
