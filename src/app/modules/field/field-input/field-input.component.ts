import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.scss']
})
export class FieldInputComponent implements OnInit {
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.field);
  }

}
