import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent {
  date: Date | null = null;
  placeholderText = 'Choose a date';
  selectedList: string = "All";

  constructor(private apiService: ApiService) {}

  getSelectedList() {
    if (this.selectedList === "complete" || this.selectedList === "incomplete") {
      if (this.date) {
        const formattedDate = this.formatDate(this.date);
        console.log("Called by getSelectedList")
        this.fetchTodoList(this.selectedList, formattedDate);
        
      } else {
        console.log("Called by getSelectedList")
        this.fetchTodoList(this.selectedList);
      }
    }
    else {
      console.log("Called by getSelectedList")
      this.fetchTodoList();
    }
  }

  onDateChange(date: Date | null) {
    this.date = date;
    this.placeholderText = this.date ? 'Date selected' : 'Choose a date';
    if (this.selectedList === "complete" || this.selectedList === "incomplete") {
      if (this.date) {
        const formattedDate = this.formatDate(this.date);
        console.log("Called by dateList")
        this.fetchTodoList(this.selectedList, formattedDate);
      }
    } else {
      console.log("Called by dateList")
      this.fetchTodoList();
    }
  }

  resetPlaceholder() {
    this.placeholderText = 'Choose a date';
    this.date = null;
    console.log("Called by resetList")
    this.fetchTodoList();
  }

  private fetchTodoList(list?: string, date?: string) {
    this.apiService.getTodolist(list, date).subscribe((data) => {
      if (data) {
        this.apiService.callgetTodolistFunction();
      }
    });
  }

  private formatDate(date: Date): string {
    
    return date.toISOString().split('T')[0];
  }
}
