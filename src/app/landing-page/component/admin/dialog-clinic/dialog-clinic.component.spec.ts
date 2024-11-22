import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClinicComponent } from './dialog-clinic.component';

describe('DialogClinicComponent', () => {
  let component: DialogClinicComponent;
  let fixture: ComponentFixture<DialogClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
