import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDoctorComponent } from './dialog-doctor.component';

describe('DialogDoctorComponent', () => {
  let component: DialogDoctorComponent;
  let fixture: ComponentFixture<DialogDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
