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

  //list
    todolist: any;

  // selected status to filter
  selectedStatus: any;

  // selected date to filter
  selectedDate: any;


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


  ngOnInit(){
    
    this.apiService.getTodolist().subscribe((data) => {
      this.todolist = data
    })

  }

  getSelectedStatus(selectedList: string) {
    this.selectedStatus = selectedList
    console.log(selectedList)
    console.log(this.selectedDate)
    if (this.selectedStatus === "complete" || this.selectedStatus === "incomplete") {
      
      if (this.selectedDate) {
                this.apiService.getTodolist(this.selectedStatus,this.selectedDate).subscribe((data) => {
        this.todolist = data
                })
      }
      
      else {
                        this.apiService.getTodolist(this.selectedStatus).subscribe((data) => {
        this.todolist = data
                })
      }
    }

    else {
      this.selectedDate = undefined;
      this.apiService.getTodolist().subscribe((data) => {
        this.todolist = data
      })
    }
  }

  getSelectedDate(date : any) {
    if (date) {
      this.selectedDate = date
      console.log(this.selectedDate)
      if (this.selectedStatus === "complete" || this.selectedStatus === "incomplete") {
        this.apiService.getTodolist( this.selectedStatus,this.selectedDate).subscribe((data) => {
        this.todolist = data
        })
      }
      else {
          this.apiService.getTodolist( undefined,this.selectedDate).subscribe((data) => {
        this.todolist = data
      })
      }
    }
    
    else {
      this.apiService.getTodolist().subscribe((data) => {
        this.todolist = data
      })
    }
  }

}
