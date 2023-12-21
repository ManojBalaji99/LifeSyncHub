import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-moments-input',
  templateUrl: './moments-input.component.html',
  styleUrls: ['./moments-input.component.css']
})
export class MomentsInputComponent {
myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private apiService :ApiService) {
    this.myForm = this.formBuilder.group({
      date: ['', Validators.required], // Date field with required validation
      emotion: ['', Validators.required], // Emotion field with required validation
      heading: ['', Validators.required], // Heading field with required validation
      description: ['', Validators.required] // Description field with required validation
    });
  }

 async onSubmit() {
    if (this.myForm.valid) {
      // Access form values here
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
        console.log(data)
      })


    } else {
      console.log('Form is invalid');
    }

    this.myForm.reset()
  }

  
}
