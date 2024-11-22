import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralManagementComponent } from './general-management.component';

describe('GeneralManagementComponent', () => {
  let component: GeneralManagementComponent;
  let fixture: ComponentFixture<GeneralManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
