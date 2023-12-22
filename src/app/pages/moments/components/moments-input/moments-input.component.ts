import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { MomentsComponent } from '../../moments.component';

@Component({
  selector: 'app-moments-input',
  templateUrl: './moments-input.component.html',
  styleUrls: ['./moments-input.component.css']
})
export class MomentsInputComponent implements OnInit {
  emotionsList = ["Happy","Sad","Bored","Loved","Excitement","Curiosity","Disappoinment"]
  myForm: FormGroup;



  constructor(private formBuilder: FormBuilder,private apiService :ApiService,@Inject(MAT_DIALOG_DATA) public data : any) {
    this.myForm = this.formBuilder.group({
      date: ['', Validators.required], 
      emotion: ['', Validators.required], 
      heading: ['', Validators.required],
      description: ['', Validators.required] 
    });

  }

ngOnInit(): void {
    if (this.data?.moment_id) {
      this.myForm = this.formBuilder.group({
        date: [this.data.formatted_date, Validators.required],
        emotion: [this.data.emotion, Validators.required],
        heading: [this.data.heading, Validators.required],
        description: [this.data.description, Validators.required]
      });
    }
  }

 async onSubmit() {
    if (this.myForm.valid) {
      if (!this.data?.moment_id) {
      const dateValue = await this.myForm.get('date')!.value;
      const emotionValue = await this.myForm.get('emotion')!.value;
      const headingValue = await this.myForm.get('heading')!.value;
      const descriptionValue = await this.myForm.get('description')!.value;
      let momentsInput = {
        date: dateValue,
        emotion: emotionValue,
        heading: headingValue,
        description: descriptionValue
      }

      this.apiService.postMoments(momentsInput).subscribe((data) => {
        if (data) {
          console.log(data)
          this.callGetMoments()
        }
      })
      }
      
      else {
        const dateValue = await this.myForm.get('date')!.value;
      const emotionValue = await this.myForm.get('emotion')!.value;
      const headingValue = await this.myForm.get('heading')!.value;
      const descriptionValue = await this.myForm.get('description')!.value;
        let momentUpdate = {
        moment_id : this.data.moment_id,
        date: dateValue,
        emotion: emotionValue,
        heading: headingValue,
        description: descriptionValue
      }

      this.apiService.updateMoments(momentUpdate).subscribe((data) => {
        if (data) {
          console.log(data)
          this.callGetMoments()
        }
      })
      }


    } else {
      console.log('Form is invalid');
    }

    this.myForm.reset()
 }
  
  callGetMoments() {
      this.apiService.callgetMomentFunction()
    }

    parseISOStringToDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; 
  }
  
}
