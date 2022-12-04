import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-field-file',
  templateUrl: './field-file.component.html',
  styleUrls: ['./field-file.component.scss']
})
export class FieldFileComponent implements OnInit {
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.field.value = this.field && this.field.multiple ? files : _.last(files);
      // this.myForm.patchValue({
      //   fileSource: file
      // });
    }
  }

}
