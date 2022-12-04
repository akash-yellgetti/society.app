import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from './validation.service';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private fields: any;
  private values: any;
  private errors: any;

  // tslint:disable:triple-equals
  // tslint:disable:forin
  constructor(private validationService: ValidationService, private toastr: ToastrService) { }

  getPrimaryField = () => {
    const fields: any = this.getFields()
    return _.find(fields, { field_type: 'primary' });
  }

  setFields = (fields: any) => {
    this.fields = _.cloneDeep(fields);
    return this;
  }

  getFields = () => {
    return this.fields;
  }

  setValues = (values: any) => {
    this.values = _.cloneDeep(values);
    return this;
  }

  getValues = () => {
    return this.values;
  }

  setFieldsValues = () => {
    const values: any = this.getValues();
    const fields: any = this.getFields()
    _.each(fields, function (field, keys) {
      const val = _.get(values, _.get(field, 'name'));
      if (val) {
        _.set(field, 'value', val);
      }
    });

    this.setFields(fields);
    return this;
  }
  /**
     * Reset all values after successful submission.
     * @param json fields Form fields
     */
  resetValues = () => {
    const fields: any = this.getFields();
    const newFields = _.chain(fields).mapValues(val => {
          let value = val.default || '';
          _.set(val, 'value', value);
          return val;
        }).values().value();
    this.setFields(newFields);
    return this;
  }

  setErrors = (values: any) => {
    this.errors = _.cloneDeep(values);
    return this;
  }

  getErrors = () => {
    return this.errors;
  }

  getErrorsCount = (): number => {
    return _.size(this.errors);
  }

  setToastr = () => {
    const errors = _.cloneDeep(this.errors);
    for (const ind in errors) {
      const error = errors[ind];
      for (const errI in error) {
        const message = error[errI];
        this.toastr.error(message);
      }
    }
  }

  validate = () => {
    const data = _.chain(_.cloneDeep(this.fields))
      .map((vals, key) => {
        vals.validations = vals.validations ? vals.validations.split('|') : vals.validations;
        return vals;
      })
      .reduce((result, val, key) => {
        const errors = _.reduce(val.validations, (errors, data) => {

          if (this.validationService[data] && !this.validationService[data](val.value)) {
            errors.push(val.label + " is " + data + ".")
          }

          return errors;
        }, []);

        if (errors && errors.length > 0) {
          result[val.name] = errors;
        }

        return result;
      }, {})
      .value();
    this.setErrors(data);

    return this;
  }

  getJsonData = () => {
    return _.chain(this.fields).keyBy('name').mapValues(data => {
      if (data.field_type === 'date' && data.value && ['Invalid date'].indexOf(data.value) <= -1) {
        data.value = moment(data.value).format('YYYY-MM-DD');
      }
      return data.value;
    }).omitBy(_.isUndefined).value();
  }

  getFormData = (name: string) => {
    const formdata = new FormData();
    formdata.append('module', name);
    // formdata.append('__sub_module', name);
    const data = this.getJsonData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        formdata.append(key, value);
      }
    }
    return formdata;
  }
}
