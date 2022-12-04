import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss']
})
export class FieldBuilderComponent implements OnInit {
  @Input() fields: any = [];
  constructor() {

  }

  ngOnInit(): void {
  }

}
