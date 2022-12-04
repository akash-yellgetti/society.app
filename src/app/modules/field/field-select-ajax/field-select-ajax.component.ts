import {Component, OnInit, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { FormService } from '../../../core/api/form/form.service';
import { Observable } from 'rxjs/internal/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-field-select-ajax',
  templateUrl: './field-select-ajax.component.html',
  styleUrls: ['./field-select-ajax.component.scss']
})
export class FieldSelectAjaxComponent implements OnInit {
  @Input() field: any;

  options: any = [
    {name: 'Mary'},
    {name: 'Shelley'},
    {name: 'Igor'}
  ];
  currentOption: any[];
  filteredOptions: Observable<any[]>;

  constructor(private formService: FormService){

  }

  ngOnInit() {
    // this.filteredOptions = this.options;
    this.doFilter();

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => typeof value === 'string' ? value : value.name),
    //     map(name => name ? this._filter(name) : this.options.slice())
    //   );
  }

  updateSelection = ($event: any): any => {
    this.field.optionValue = $event.option._element.nativeElement.textContent;
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  doFilter() {
    const params: any = {
      field: this.field,
      search: {
        value: this.field.value
      },
      length: 10
    };

    const option =  _.keys(_.keyBy(_.values(_.pick(this.field, ['foreign_key', 'foreign_value'])), 'name'));
    // console.log(option);

    this.currentOption = option;

    this.formService.autoComplete(params).subscribe((res) => {
      const data = _.get(res, 'data');
      // console.log(option);

      this.filteredOptions = res.data;
      // console.log(_.map(data, (r) => _.pick(r, option))));

    })

  }
}