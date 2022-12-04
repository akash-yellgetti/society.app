import { AfterViewInit, Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import * as _ from 'lodash';
import { StorageService } from '../../../core/services/storage.service';
import { LoaderService } from '../../../core/services/loader.service';
import { FieldService } from '../../../core/services/field.service';
import { FormService } from '../../../core/api/form/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MaintenanceService } from 'src/app/core/api/maintenance/maintenance.service';
import { CommonComponentService } from 'src/app/core/services/common-component.service';
@Component({
  selector: 'app-maintenance-generate',
  templateUrl: './maintenance-generate.component.html',
  styleUrls: ['./maintenance-generate.component.scss']
})
export class MaintenanceGenerateComponent implements OnInit {

  public form;
  public templates: any = [
    {
      template_id: 1,
      name: 'Template 1 BHK',
    },
    {
      template_id: 2,
      name: 'Template 2 BHK',
    }
  ];
  public types: any = [
    {
      code: 'monthly',
      name: 'Monthly',
    },
    {
      code: 'quartly',
      name: 'Quartly',
    }
  ];
  public flats: any  = new FormControl();
  public template: any;
  public type: any;
  constructor(public commonComponentService: CommonComponentService, 
    private router: Router,
    private maintenanceService: MaintenanceService,
    private formService: FormService,
    private fieldService: FieldService) {

  }

  async ngOnInit() {
    await this.commonComponentService.set('maintenance-generate');
    this.form = this.commonComponentService.getForm();
    this.list();
  }

  templateChanged = (template_id: string) => {
    this.maintenanceService.templateCharges({
      template_id
    }).subscribe((res) => {
      this.template = res.data;
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
    params['charges'] = this.template.charges;
    params['flats'] = this.flats.value;
    params['no_of_months'] = this.type;
    console.log(params);
    
    const api = primaryId ? this.maintenanceService.updateGenerate(params) : this.maintenanceService.createGenerate(params);

    api.subscribe((res: any) => {
      if (res && res.status) {
        const form: any = _.cloneDeep(this.form);
        form.action = 'list';
        this.form = form;
        this.form.fields = this.fieldService.resetValues().getFields();
      }
    })
  }


  getTableField = () => {
    const fields = this.form.fields;
    // const listingFields = this.fieldService.setFields(this.fields).validate().getErrors();
    const listFields = _.chain(fields).filter(data => data.datatable).value();
    this.form.paginator.displayedColumns = _.union(_.values(_.mapValues(listFields, 'name')), ['more']);
    return listFields;
  }

  getListField = () => {
    const fields = this.form.fields;

    // const listingFields = this.fieldService.setFields(this.fields).validate().getErrors();
    const listFields = _.chain(fields).filter(data => data.datatable)
      .reject((res) => _.get(res, 'name') === _.get(this.fieldService.setFields(fields).getPrimaryField(), 'name'))
      .orderBy(['field_type'], ['desc'])
      .mapValues('name')
      .values()
      .value();


    return listFields;
  }

  handlePageEvent = (event: any) => {
    const paginator = this.form.paginator;
    paginator.pageSize = event.pageSize;
    paginator.pageIndex = event.pageIndex;
    paginator.sort = {};
    // this.list()
  }

  search = () => {
    const paginator = this.form.paginator;
    paginator.pageSize = 10;
    paginator.pageIndex = 0;
    paginator.sort = {};
    // this.list();
  }

  onSearchClear = () => {
    const paginator = this.form.paginator;
    paginator.search = "";
    paginator.pageSize = 10;
    paginator.pageIndex = 0;
    paginator.sort = {};
    // this.list();
  }

  sortData = (event: any) => {
    const paginator = this.form.paginator;
    paginator.sort = event;
    paginator.pageIndex = 0;
    // this.list();
  }

  list = () => {
    const fields = this.form.fields;
    const columns = this.commonComponentService.getColumns();
    const sort: any = this.form.paginator.sort;
    const params: any = { columns };
    if (_.size(sort)) {
      const columnIndex = _.findIndex(columns, { data: _.get(sort, 'active') });
      params['order'] = [
        {
          column: columnIndex,
          dir: _.get(sort, 'direction') || 'asc',
        }
      ];
    }

    const index: any = _.findIndex(_.split(this.router.url, '/'), function (d) { return d === 'user'; });
    params.__form = this.form.code;
    params.profile = index === 2 ? true : false;
    this.form.paginator.draw = this.form.paginator.draw + 1;
    params.draw = this.form.paginator.draw;
    params.start = this.form.paginator.draw === 1 ? 0 : this.form.paginator.pageSize * this.form.paginator.pageIndex;
    params.length = this.form.paginator.pageSize;
    params.search = {};
    params.search['value'] = this.form.paginator.search;
    params.search['regex'] = false;



    // // console.log(params);

    this.formService.datatable(params).subscribe((res: any) => {
      if (res && res.data) {
        this.form.data = _.get(res, 'data');
        // this.paginator.length = _.get(res, 'recordsFiltered');
        // this.paginator.listFields = this.getListField();
      }
    })
  }


}