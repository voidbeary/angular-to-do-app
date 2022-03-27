import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, TodoListComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
