import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.scss']
})
export class FieldSelectComponent implements OnInit {
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
    this.field.options = _.isString(this.field.options) ? [] : this.field.options;
  }

}
