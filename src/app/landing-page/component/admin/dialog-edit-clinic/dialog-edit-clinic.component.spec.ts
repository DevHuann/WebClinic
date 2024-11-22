import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditClinicComponent } from './dialog-edit-clinic.component';

describe('DialogEditClinicComponent', () => {
  let component: DialogEditClinicComponent;
  let fixture: ComponentFixture<DialogEditClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
