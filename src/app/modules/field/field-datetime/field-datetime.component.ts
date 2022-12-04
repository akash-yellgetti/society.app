import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-datetime',
  templateUrl: './field-datetime.component.html',
  styleUrls: ['./field-datetime.component.scss'],
  providers: [
    ]
})
export class FieldDatetimeComponent implements OnInit {
  @Input() field: any;
  constructor() { }

  ngOnInit(): void {
  }

}
