import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as form from '../../../core/json/forms/self-profile.json';
import * as _ from 'lodash';
import { StorageService } from '../../../core/services/storage.service';
import { FieldService } from '../../../core/services/field.service';
import { ProfileService } from '../../../core/api/profile/profile.service';
import { LoaderService } from 'src/app/core/services/loader.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  step = 0;
  fields: any = [];
  disabled = false;

  constructor(private router: Router, private storageService: StorageService, private fieldService: FieldService, private profileService: ProfileService, private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    const breadcrumbs = this.loaderService.generateBreadCrumbs(this.router.url);
    const mainHeader = _.get(_.last(breadcrumbs), 'label');
    this.loaderService.emitData('mainHeader', mainHeader);
    this.fields = _.get(form, 'default.fields');
    const user = this.storageService.get('user');
    this.fields = this.fieldService.setFields(this.fields).setValues(user).setFieldsValues().getFields();
  }

  save = () => {
    const fields = this.fields;
    const errors = this.fieldService.setFields(this.fields).validate().getErrors();
    if(this.fieldService.getErrorsCount()) {
      this.fieldService.setToastr();
    }
    const params = this.fieldService.getJsonData();

    this.profileService.update(params).subscribe((res: any) => {
      if (res && res.status) {
        this.storageService.delete('user');
        this.storageService.set('user', res.data);
      }
    })
  }

  
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  

}
