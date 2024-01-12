import { Component, Input, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-container',
  templateUrl: './todo-container.component.html',
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent {

  constructor(public apiService : ApiService){}
  
  @Input() todo: any;
  
  toggleChecked: boolean = false;
  currentDate: Date | undefined;

  onToggleChange(event: any) {
    if (this.toggleChecked) {
      this.currentDate = new Date();
      const formattedDate = this.currentDate.toISOString().split('T')[0];
      let body = { todo: this.todo.todo, completed_on: formattedDate }
      console.log(body)
      this.apiService.updateToDoListStatus(body).subscribe((data) => {
        if (data) {
          this.apiService.callgetTodolistFunction()
        }
      })
    } else {
      this.currentDate = undefined;
    }
  }

  deleteToDo() {
    let body = { id: this.todo.id }
    this.apiService.deleteToDo(body).subscribe((data) => {
      if (data) {
        this.apiService.callgetTodolistFunction();
      }
    })
  }
}
