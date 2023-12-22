import { Component,EventEmitter,Input,Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-moments-container',
  templateUrl: './moments-container.component.html',
  styleUrls: ['./moments-container.component.css']
})
export class MomentsContainerComponent {
  @Input() moment: any;
  @Output() momentEmitter = new EventEmitter()
 
  constructor(private apiService : ApiService){}


getMoment(){
  this.momentEmitter.emit(this.moment)
}

  deleteMoment() {
      let body = {moment_id : this.moment.moment_id}
      this.apiService.deleteMoments(body).subscribe((data)=>{
        if(data){
          console.log(data)
          this.apiService.callgetMomentFunction()
        }
      })
}
}
