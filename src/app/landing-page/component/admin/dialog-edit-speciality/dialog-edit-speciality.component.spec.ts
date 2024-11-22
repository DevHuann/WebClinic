import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditSpecialityComponent } from './dialog-edit-speciality.component';

describe('DialogEditSpecialityComponent', () => {
  let component: DialogEditSpecialityComponent;
  let fixture: ComponentFixture<DialogEditSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditSpecialityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
