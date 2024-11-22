import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClinicComponent } from './list-clinic.component';

describe('ListClinicComponent', () => {
  let component: ListClinicComponent;
  let fixture: ComponentFixture<ListClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClinicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
