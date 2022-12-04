import { AfterViewInit, Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { StorageService } from '../../../core/services/storage.service';
import { LoaderService } from '../../../core/services/loader.service';
import { FieldService } from '../../../core/services/field.service';
import { FormService } from '../../../core/api/form/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MaintenanceService } from 'src/app/core/api/maintenance/maintenance.service';
import { CommonComponentService } from 'src/app/core/services/common-component.service';

@Component({
  selector: 'app-maintenance-template',
  templateUrl: './maintenance-template.component.html',
  styleUrls: ['./maintenance-template.component.scss']
})
export class MaintenanceTemplateComponent implements OnInit {
  public form;
  public chargesMaster;
  constructor(private commonComponentService: CommonComponentService, private maintenanceService: MaintenanceService,
    private fieldService: FieldService) {
    
  }

  async ngOnInit() {
    await this.commonComponentService.set('maintenance-template');
    this.form = this.commonComponentService.getForm();
    this.maintenanceService.templateChargesMaster().subscribe((res) => {
      this.chargesMaster = res.data;
    });
  }

  
  save = () => {
    const fields = this.form.fields;

    const errors = this.fieldService.setFields(fields).validate().getErrors();

    if (this.fieldService.getErrorsCount()) {
      this.fieldService.setToastr();
    }
    const params = this.fieldService.getJsonData();
    const primaryId = _.get(params, _.get(this.fieldService.getPrimaryField(), 'name'));
    params.__form = this.form.code;
    params['charges'] = this.chargesMaster;
    const api = primaryId ? this.maintenanceService.updateTemplate(params) : this.maintenanceService.createTemplate(params);

    api.subscribe((res: any) => {
      if (res && res.status) {
        const form: any = _.cloneDeep(this.form);
        form.action = 'list';
        this.form = form;
        this.form.fields = this.fieldService.resetValues().getFields();
      }
    })
  }
}