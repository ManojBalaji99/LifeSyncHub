import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit { 

  private subscription: Subscription;

  constructor(private apiService: ApiService) {
    this.subscription = this.apiService.getToDoListFunctionCalled$.subscribe(() => {
      this.getToDoListAfterEdit()
    })
  }
  getToDoListAfterEdit() {
    this.apiService.getTodolist().subscribe((data) => {
      this.todolist = data
    })
  }
  todolist: any;

  ngOnInit(){
    
    this.apiService.getTodolist().subscribe((data) => {
      this.todolist = data
    })

  }

}
