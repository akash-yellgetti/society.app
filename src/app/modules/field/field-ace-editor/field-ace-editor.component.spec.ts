import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldAceEditorComponent } from './field-ace-editor.component';

describe('FieldAceEditorComponent', () => {
  let component: FieldAceEditorComponent;
  let fixture: ComponentFixture<FieldAceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldAceEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldAceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
