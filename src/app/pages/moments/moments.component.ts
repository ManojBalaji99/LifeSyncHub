import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MomentsInputComponent } from './components/moments-input/moments-input.component';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent{

  toggleButton = false;
  emotions = new FormControl()
  selectedEmotions: string[] = [];
  moments: any;
  filteredDate: any = 2023
  emotionsList = ["Happy","Sad","Bored","Loved","Excitement","Curiosity","Disappoinment"]


  constructor(private apiService : ApiService,private dialogRef : MatDialog){}




  getFilterDate(value: any) {
    this.filteredDate = value
    let params = this.constructQueryString(this.filteredDate)
    // if (this.selectedEmotions.length > 0) {
    //   this.apiService.getMoments(params, this.selectedEmotions).subscribe((data) => {
    //     this.moments = data
    //     console.log(data)
    //   })
    // }

    this.apiService.getMoments(params).subscribe((data) => {
        this.moments = data
        console.log(data)
      })


  }


constructQueryString(params: any): string {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return queryString;
}
  
  getEmotionStatus(event : any) {
    this.selectedEmotions = this.emotions.value
    let params = this.constructQueryString(this.filteredDate)
    this.apiService.getMoments(params, this.selectedEmotions).subscribe((data) => {
        this.moments = data
        console.log(data)
      })
  }

  toggleInput() {
    this.toggleButton = !this.toggleButton
  }

  openDialog() {
    this.dialogRef.open(MomentsInputComponent)
  }
}
