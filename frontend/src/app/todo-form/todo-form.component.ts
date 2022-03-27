import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ListItemsService } from '../services/todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  @Output() todosUpdated: EventEmitter<void> = new EventEmitter();

  myForm: FormGroup = new FormGroup({
    title: new FormControl('', {
      updateOn: 'blur',
      validators: [Validators.required, Validators.pattern('[^s].*')],
    }),
  });

  constructor(private fb: FormBuilder, private todoService: ListItemsService) {}

  createTodo() {
    const todo = this.myForm.getRawValue();
    this.todoService.createTodo(todo).subscribe(() => {
      this.myForm.reset();
      this.todosUpdated.emit();
    });
  }

  get newTodo() {
    return this.myForm.get('title');
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: '',
    });
  }
}
