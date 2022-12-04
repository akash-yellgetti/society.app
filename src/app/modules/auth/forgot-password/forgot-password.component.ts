import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as form from '../../../core/json/forms/self-forgot-password.json';
import * as _ from 'lodash';
import { StorageService } from '../../../core/services/storage.service';
import { FieldService } from '../../../core/services/field.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AuthService } from 'src/app/core/api/auth/auth.service';
import { ProfileService } from 'src/app/core/api/profile/profile.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public flag = {
    requestOtp: true,
    verifyOtp: false,
    mobileNo: false,
    changePassword: false,
    otpFlag: 'Request',
    token: ''
  };
  public input: any = {
    otp: ''
  };
  public otp: string;
  public password: string;
  public confirm_password: string;
  public fields: any;
  constructor(private router: Router, private storageService: StorageService, 
    private fieldService: FieldService, private loaderService: LoaderService, private authService: AuthService,
     private profileService: ProfileService) { }

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
        this.flag.token = res.data.token
        this.flag.requestOtp = false;
        this.flag.verifyOtp = false;
        this.flag.changePassword = true;
      }
      // return $window.open('/login', '_self');
    });
  }

  changePassword = () => {
    this.profileService.changePassword({
      password: this.password
    }, this.flag.token).subscribe((res) => {
      if (res.status == 1) {
        this.flag.requestOtp = false;
        this.flag.verifyOtp = false;
        this.flag.changePassword = true;
        this.router.navigate(['auth/login']);
      }
    });
  }

}