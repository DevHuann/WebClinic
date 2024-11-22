import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogScheduleDetailComponent } from './dialog-schedule-detail.component';

describe('DialogScheduleDetailComponent', () => {
  let component: DialogScheduleDetailComponent;
  let fixture: ComponentFixture<DialogScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogScheduleDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
