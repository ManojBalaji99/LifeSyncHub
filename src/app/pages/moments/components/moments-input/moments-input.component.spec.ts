import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentsInputComponent } from './moments-input.component';

describe('MomentsInputComponent', () => {
  let component: MomentsInputComponent;
  let fixture: ComponentFixture<MomentsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MomentsInputComponent]
    });
    fixture = TestBed.createComponent(MomentsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
