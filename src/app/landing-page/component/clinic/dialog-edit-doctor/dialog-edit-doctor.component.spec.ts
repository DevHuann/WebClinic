import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditDoctorComponent } from './dialog-edit-doctor.component';

describe('DialogEditDoctorComponent', () => {
  let component: DialogEditDoctorComponent;
  let fixture: ComponentFixture<DialogEditDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
