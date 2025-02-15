import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogScheduleComponent } from './dialog-schedule.component';

describe('DialogScheduleComponent', () => {
  let component: DialogScheduleComponent;
  let fixture: ComponentFixture<DialogScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
