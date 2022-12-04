import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorComponent } from 'ckeditor4-angular'

@Component({
  selector: 'app-field-ck-editor',
  templateUrl: './field-ck-editor.component.html',
  styleUrls: ['./field-ck-editor.component.scss']
})
export class FieldCkEditorComponent implements OnInit {
  // public Editor = CKEditor4;
  public config = {
    fullPage: false,
    allowedContent: true,
    autoGrow_onStartup: true,
    placeholder: ''
  };
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
    this.field.value = this.field.value || "";
    this.config.placeholder = this.field.label;
  }

}
