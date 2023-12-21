import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-moments-container',
  templateUrl: './moments-container.component.html',
  styleUrls: ['./moments-container.component.css']
})
export class MomentsContainerComponent {
  @Input() moment: any;
  @Output() momentEmitter = new EventEmitter()
 


getMoment(){
  this.momentEmitter.emit(this.moment)
}

}
