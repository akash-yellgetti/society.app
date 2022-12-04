import { Injectable } from '@angular/core';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  // tslint:disable:triple-equals
  constructor() { }

  required = (value: any) => {
    return !_.isEmpty(value) ? true : false;
  }

  required_if = (value, field) => {
    return field && [false, 'none', 'keep_time'].indexOf(field) === -1 && this.required(field) ? this.required(value) : true;
  }

  file = (value) => {
    return (typeof value != undefined && Object.keys(value).length > 0 && value.queue.length > 0) ? true : false;
  }

  titleFormat = (value) => {
    const regexp = /^[^\^\`\~]*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  max = (value, len) => {
    return (typeof value != undefined && value.length > 0 && value !== null && value.length < len) ? true : false;
  }

  regex = (value, regExpression) => {
    // tslint:disable:no-eval
    const regexp = eval(regExpression);
    return (typeof value !== 'undefined' && value !== '' && value !== null) ? regexp.test(value) : true;
  }

  nameFormat = (value) => {
    const regexp = /^[a-zA-Z0-9\p{L}-’'\s]*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }
  nameFormatLatName = (value) => {
    const regexp = /^[a-zA-Z0-9\p{L}-’,.'\s]*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  domain = (value) => {
    const regexp = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : false;
  }

  multipleDomains = (value) => {
    const regexp = /^\s*(?:(?:\w+(?:-+\w+)*\.)+[a-z]+)\s*(?:[;,]\s*(?:(?:\w+(?:-+\w+)*\.)+[a-z]+)\s*)*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  hexColorCode = (value) => {
    const regexp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : false;
  }

  alphanumericFormat = (value) => {
    const regexp = /^[a-zA-Z0-9]*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  numberFormat = (value) => {
    const regexp = /^\d+$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  positiveNegativeNumberFormat = (value: string) => {
    const regexp = /^[-]?\d*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  folderNameFormat = (value) => {
    const regexp = /^[a-zA-Z0-9#$%^&*_]*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  nonZeroNumber = (value) => {
    return (typeof value != undefined && value.length > 0 && value !== null && !isNaN(value) && Number(value) <= 0) ? false : true;
  }

  metricsFormat = (value) => {
    const regexp = /^[a-zA-Z0-9_]*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  specialCharFormat = (value) => {
    const regexp = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    return (typeof value != undefined && value.length > 0 && value !== null) ? regexp.test(value) : true;
  }

  urlValidation = (value) => {
    // const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    const regexp = /^http(s)?:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*$/;
    return (typeof value != undefined && value !== null && value.length > 0) ? regexp.test(value) : true;
  }

  lessThen = (value, value2) => {
    return (Number(value) <= Number(value2)) ? true : false;
  }

  greaterThen = (value, value2) => {
    return (Number(value) >= Number(value2)) ? true : false;
  }

  mandatory_allow_zero = (value) => {
    return (typeof value != undefined && value != '' && value !== null) || (!isNaN(value) && Number(value) === 0) ? true : false;
  }
}
