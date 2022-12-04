import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCkEditorComponent } from './field-ck-editor.component';

describe('FieldCkEditorComponent', () => {
  let component: FieldCkEditorComponent;
  let fixture: ComponentFixture<FieldCkEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCkEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCkEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
