import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as form from '../../../core/json/forms/self-resgistration.json';
import * as _ from 'lodash';
import { StorageService } from '../../../core/services/storage.service';
import { FieldService } from '../../../core/services/field.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AuthService } from 'src/app/core/api/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public flag = {
    requestOtp: true,
    verifyOtp: false,
    mobileNo: false,
    register: false,
    otpFlag: 'Request'
  };
  public input: any = {
    otp: ''
  };
  public otp: string;
  public password: string;
  public confirm_password: string;
  public fields: any;
  constructor(private router: Router, private storageService: StorageService, private fieldService: FieldService, private loaderService: LoaderService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fields = _.get(form, 'default.fields');
  }

  request = function () {
    var otpParams = {
      email: _.get(_.find(this.fields, { name: 'email' }), 'value'),
      mobile_no: _.get(_.find(this.fields, { name: 'mobile_no' }), 'value'),
      flag: 'reg'
    };


    this.authService.request(otpParams).subscribe((res) => {
      // var res = data.data;
      console.log(res);
      // return $window.open('/login', '_self');
      if (res && res.status && res.status === 1) {
        this.flag.requestOtp = false;
        this.flag.verifyOtp = true;
        this.flag.mobileNo = true;
      }
    });
  }

  verify = (otp) => {

    var otpParams = {
      email: _.get(_.find(this.fields, { name: 'email' }), 'value'),
      mobile_no: _.get(_.find(this.fields, { name: 'mobile_no' }), 'value'),
      flag: 'reg',
      otp: otp
    };

    console.log(otpParams);

    this.authService.verify(otpParams).subscribe((res) => {
      if (res.status == 1) {
        this.flag.requestOtp = false;
        this.flag.verifyOtp = false;
        this.flag.register = true;
      }
      // return $window.open('/login', '_self');
    });
  }

  register = () => {
    const fields = this.fields;

    const errors = this.fieldService.setFields(this.fields).validate().getErrors();

    if (this.fieldService.getErrorsCount()) {
      this.fieldService.setToastr();
    }
    const params = this.fieldService.getJsonData();
    params.password = this.password;
    params.confirm_password = this.confirm_password;
    this.authService.register(params).subscribe((res) => {
      if (res.status == 1) {
        this.flag.requestOtp = false;
        this.flag.verifyOtp = false;
        this.flag.register = true;
        this.router.navigate(['auth/login']);
      }
    });
  }
}
