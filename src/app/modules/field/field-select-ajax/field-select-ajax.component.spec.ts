import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSelectAjaxComponent } from './field-select-ajax.component';

describe('FieldSelectAjaxComponent', () => {
  let component: FieldSelectAjaxComponent;
  let fixture: ComponentFixture<FieldSelectAjaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSelectAjaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectAjaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
