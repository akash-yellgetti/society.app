import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-textarea',
  templateUrl: './field-textarea.component.html',
  styleUrls: ['./field-textarea.component.scss']
})
export class FieldTextareaComponent implements OnInit {
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.field);
  }

}
