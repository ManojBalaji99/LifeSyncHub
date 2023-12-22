import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MomentsInputComponent } from './components/moments-input/moments-input.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.component.html',
  styleUrls: ['./moments.component.css']
})
export class MomentsComponent implements OnInit{
  emotions = new FormControl()
  selectedEmotions: string[] = [];
  moments: any;
  filteredDate: any;
  editableMoment: any;
  emotionsList = ["Happy","Sad","Bored","Loved","Excitement","Curiosity","Disappoinment"]
  private subscription: Subscription



  constructor(private apiService: ApiService, private dialogRef: MatDialog) {
    this.subscription = this.apiService.getMomentFunctionCalled$.subscribe(() => {
      this.getMomentsAfterEdit()
    })
  }


ngOnInit(): void {

  this.apiService.getMoments().subscribe((data) => {
    this.moments = data
  })
}

  getFilterDate(value: any) {
    this.filteredDate = value
    let params = this.constructQueryString(this.filteredDate)
    if (this.selectedEmotions.length > 0) {
      this.apiService.getMoments(params, this.selectedEmotions).subscribe((data) => {
        this.moments = data
        console.log(data)
      })
    }

    this.apiService.getMoments(params).subscribe((data) => {
        this.moments = data
        console.log(data)
      })


  }
  
  getEmotionStatus(event : any) {
    this.selectedEmotions = this.emotions.value
    let params = this.constructQueryString(this.filteredDate)
    this.apiService.getMoments(params, this.selectedEmotions).subscribe((data) => {
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

  openDialog() {
    this.dialogRef.open(MomentsInputComponent)
  }

  openDialogEdit(data : any) {
    this.dialogRef.open(MomentsInputComponent, {
      data : data
    })
  }

  getMomentForEdit(moment : any) {
    console.log(moment) 
    this.openDialogEdit(moment)
  }
  getMomentsAfterEdit() {
    if (this.filteredDate) {
      let params = this.constructQueryString(this.filteredDate)
      if (this.selectedEmotions.length > 0) {
        this.apiService.getMoments(params, this.selectedEmotions).subscribe((data) => {
          this.moments = data
          console.log(data)
        })
      }

      this.apiService.getMoments(params).subscribe((data) => {
        this.moments = data
        console.log(data)
      })
    }
    else {
      this.apiService.getMoments().subscribe((data) => {
        this.moments = data
      })
    }
  }
  
  showAllMoments() {
    this.apiService.getMoments().subscribe((data) => {
      this.moments= data
    })
  }

}
