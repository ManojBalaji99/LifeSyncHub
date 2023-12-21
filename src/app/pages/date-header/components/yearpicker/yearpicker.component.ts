import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';

const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-yearpicker',
  templateUrl: './yearpicker.component.html',
  styleUrls: ['./yearpicker.component.css'],
  providers: [
   
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class YearpickerComponent {
  @Output() yearEmitter = new EventEmitter()

  date = new FormControl(moment());

chosenYearHandler(normalizedYear: Moment, dp: any) {
  const ctrlValue = this.date.value;
  if (ctrlValue) {
    const updatedValue = ctrlValue.clone().year(normalizedYear.year());
    this.date.setValue(updatedValue);
    dp.close();
    console.log(this.date.value?.year())
    let year = this.date.value?.year()
    this.getYear(year)


  } else {
    console.error('ctrlValue is null or undefined');
  }
}
  
  getYear(value : any) {
    this.yearEmitter.emit(value);
  }

}
