import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CommonService } from '../api/common/common.service';
@Injectable({
  providedIn: 'root'
})
export class CommonComponentService {

  private name: string;
  private view: string = 'list';
  private form: any;
  private paginator: any = {
    draw: 0,
    length: 100,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 75, 100],
    pageIndex: 1,
    showFirstLastButtons: true,
    search: "",
    sort: {},
    displayedColumns: []
  }

  constructor(private commonService: CommonService) {

  }

  set = async (name: string) => {
    this.name = name;
    const res: any = await this.commonService.getForm({
      __form: name
    }).toPromise();
    this.setForm(res.data);
  }

  get = () => {
    return this.name;
  }

  setView = (view: string) => {
    this.view = view;
  }

  getView = () => {
    return this.view;
  }

  setPaginator = (paginator: any) => {
    this.paginator = _.merge(this.paginator, paginator);
  }

  getPaginator = () => {
    return this.paginator;
  }

  setForm = (form) => {
    this.form = form;
  }

  getForm = () => {
    return _.extend(this.form, {
      view: this.getView(),
      paginator: this.getPaginator()
    });
  }

  hideAddBtn = () => {
    return _.indexOf(['add', 'edit'], this.form.action) === -1 ? true : false;
  }

  action = (event: any) => {
    // console.log(type);
    const form = this.form;
    const fields = form.fields;
    const attributes = event.target.attributes;
    const action = _.get(attributes, 'action.value');
    const data = _.get(attributes, 'data.value');
    switch (action) {
      case 'add':
        form.view = 'add';
        break;
      case 'edit':
        this.detail(JSON.parse(data));
        break;
      case 'delete':
        this.detail(JSON.parse(data));
        break;
      case 'cancel':
        this.view = 'list';
        break;

      default:
        break;
    }
  }

  detail = (params: any) => {
    // params.module = this.form.code;
    // params.__form = this.form.code;
    // const data: any = _.extend(params, {
    //   __form: params.module,
    //   __name: params.module,
    //   selectIds: [_.get(params, _.get(this.fieldService.setFields(this.fields).getPrimaryField(), 'name'))],
    // })
    // const api = this.formService.detail(params);
    // api.subscribe((res: any) => {
    //   if (res && res.status) {
    //     const form = this.form;
    //     this.fields = _.get(form, 'fields');
    //     this.fields = this.fieldService.setFields(this.fields).setValues(_.get(res, 'data')).setFieldsValues().getFields();
    //     // console.log(this.fields);

    //     // console.log(this.form);
    //     this.openPopup(this.addMember);
    //     // this.modalService.open('addMember', { centered: true, size: 'lg'  });
    //   }
    // })
  }

  getColumns = () => {
    const fields = this.form.fields;
    const columns = _.chain(fields)
      .filter(data => data.datatable)
      .reduce((result, field, key) => {
        const column = {
          title: field.label,
          data: field.name,
          name: field.name,
          type: field.field_type,
        }


        return result.concat(column);
      }, []).value();
    return columns;
  }
}
