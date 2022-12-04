import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceGenerateComponent } from './maintenance-generate.component';

describe('MaintenanceGenerateComponent', () => {
  let component: MaintenanceGenerateComponent;
  let fixture: ComponentFixture<MaintenanceGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
