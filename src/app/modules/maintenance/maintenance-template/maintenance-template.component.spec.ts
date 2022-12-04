import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceTemplateComponent } from './maintenance-template.component';

describe('MaintenanceTemplateComponent', () => {
  let component: MaintenanceTemplateComponent;
  let fixture: ComponentFixture<MaintenanceTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
