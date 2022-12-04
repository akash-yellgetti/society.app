import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSelectSqlComponent } from './field-select-sql.component';

describe('FieldSelectSqlComponent', () => {
  let component: FieldSelectSqlComponent;
  let fixture: ComponentFixture<FieldSelectSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSelectSqlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
