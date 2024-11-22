import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrescriptionComponent } from './dialog-prescription.component';

describe('DialogPrescriptionComponent', () => {
  let component: DialogPrescriptionComponent;
  let fixture: ComponentFixture<DialogPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPrescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
