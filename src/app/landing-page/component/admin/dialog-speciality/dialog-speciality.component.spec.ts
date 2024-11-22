import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSpecialityComponent } from './dialog-speciality.component';

describe('DialogSpecialityComponent', () => {
  let component: DialogSpecialityComponent;
  let fixture: ComponentFixture<DialogSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSpecialityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
