import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDatetimeComponent } from './field-datetime.component';

describe('FieldDatetimeComponent', () => {
  let component: FieldDatetimeComponent;
  let fixture: ComponentFixture<FieldDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldDatetimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
