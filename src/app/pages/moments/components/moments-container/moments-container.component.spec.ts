import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentsContainerComponent } from './moments-container.component';

describe('MomentsContainerComponent', () => {
  let component: MomentsContainerComponent;
  let fixture: ComponentFixture<MomentsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MomentsContainerComponent]
    });
    fixture = TestBed.createComponent(MomentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
