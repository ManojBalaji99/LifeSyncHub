import { Component, EventEmitter, Output } from '@angular/core';
import { rangeDate } from 'src/app/modals/rangeDate.modal';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-date-header',
  templateUrl: './date-header.component.html',
  styleUrls: ['./date-header.component.css']
})
export class DateHeaderComponent {
  filter = ["Year", "Month", "Date", "Range"]
  selectedFilter: string = "Date"

  @Output() getfilterDate = new EventEmitter()
  selectedfullDate: any = Date.now()
  selectedDateValue: any = Date.now()
  
  onFilterSelectionChange(event: any) {
    this.selectedFilter = event.value;
  }

  onDateChange(event: any) {
    this.selectedDateValue = this.formatDateToYYYYMMDD(this.selectedfullDate)
    this.getfilterDate.emit(this.selectedDateValue)
  }

  getMonthandYear(my: string) {
    this.selectedDateValue = this.convertToYYYYMM(my)
    this.getfilterDate.emit(this.selectedDateValue)
  }

  getYear(y: any) {
    this.selectedDateValue = { year: y, month: "", day: "" };
    this.getfilterDate.emit(this.selectedDateValue)
  }


  formatDateToYYYYMMDD(inputDate: string | number | Date) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = { year: year, month: month, day: day }
    return formattedDate
  }

  convertToYYYYMM(inputDate : string) {
  const date = new Date(inputDate + " 01");
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedDate = {year : year,month : month, day: ""};
  return formattedDate;
}




  
}
