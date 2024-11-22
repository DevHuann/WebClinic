import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleDetailManagementComponent } from './schedule-detail-management.component';

describe('ScheduleDetailManagementComponent', () => {
  let component: ScheduleDetailManagementComponent;
  let fixture: ComponentFixture<ScheduleDetailManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDetailManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleDetailManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
