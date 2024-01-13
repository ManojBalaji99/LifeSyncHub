import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css']
})
export class TodoFilterComponent {
  date: Date | null = null;
  placeholderText = 'Choose a date';
  selectedList : string = "All"
  @Output() selectedStatus = new EventEmitter<string>();
  @Output() selectedDate = new EventEmitter<string>();



  constructor(private apiService: ApiService) {}

  getSelectedStatus() {
    console.log(this.selectedList)
    if (this.selectedList === "complete" || this.selectedList === "incomplete") {
       this.selectedStatus.emit(this.selectedList)
    }
    else {
      this.selectedStatus.emit(this.selectedList)
      this.resetPlaceholder()
    }
  }

  onDateChange(date: Date | null) {
    this.date = date;
    this.placeholderText = this.date ? 'Date selected' : 'Choose a date';
    if (this.date) {
      const formattedDate = this.formatDate(this.date);
      // const dateFormatted = this.formatDateToYYYYMMDD(formattedDate)
      this.selectedDate.emit(formattedDate)
    }
       
      }
  

  resetPlaceholder() {
    this.placeholderText = 'Choose a date';
    this.date = null;
  }



  private formatDate(date: Date): string {
    
    return date.toISOString().split('T')[0];
  }

    formatDateToYYYYMMDD(inputDate: string | number | Date) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year} ${month} ${day}`
    return formattedDate
  }
}
