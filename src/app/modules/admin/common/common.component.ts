import { AfterViewInit, Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2, TemplateRef } from '@angular/core';
import * as _ from 'lodash';
import { StorageService } from '../../../core/services/storage.service';
import { LoaderService } from '../../../core/services/loader.service';
import { FieldService } from '../../../core/services/field.service';
import { FormService } from '../../../core/api/form/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Modal 
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; //Datepicker
import { SanitizeHtmlPipe } from 'src/app/core/pipes/sanitize-html/sanitize-html.pipe';
import * as cards from '../../../core/json/cards.json';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {
  @Output() public mainHeader = new EventEmitter<string>();

  panelOpenState = false;
  closeResult: string;  // Modal
  model: NgbDateStruct; //Datepicker

  form: any = {
    name: '',
    action: 'list',
    listType: 'grid',
  };
  paginator: any = {
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
  fields: any = [];
  items: any = [];
  card: any = "";
  removeEventListener: any = "";
  @ViewChild(MatPaginator) any: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('addMember') addMember: TemplateRef<any>;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,  // Modal 
    private loaderService: LoaderService,
    private storageService: StorageService,
    private fieldService: FieldService,
    private formService: FormService,
    public santizeHtml: SanitizeHtmlPipe,
    private elementRef: ElementRef,
    public renderer: Renderer2,
    public utilitiesService: UtilitiesService
  ) {

  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.form.name = _.get(params, '_sub_module');
    const breadcrumbs = this.loaderService.generateBreadCrumbs(this.router.url);
    const mainHeader = _.get(_.last(breadcrumbs), 'label');
    this.loaderService.emitData('mainHeader', mainHeader);
    const user = this.storageService.get('user');
    const card = _.get(_.find(_.get(cards, 'default'), { __form: this.form.name }), 'template')
    this.card = card || _.get(_.find(_.get(cards, 'default'), { __form: 'common' }), 'template');
    this.getForm();
    // Solution for catching click events on anchors using Renderer2:
    this.removeEventListener = this.renderer.listen(this.elementRef.nativeElement, 'click', this.action.bind(this));
  }

  hideAddBtn = () => {
    return _.indexOf(['add', 'edit'], this.form.action) === -1 ? true : false;
  }

  action = (event: any) => {
    // console.log(type);
    const attributes = event.target.attributes;
    const action = _.get(attributes, 'action.value');
    const data = _.get(attributes, 'data.value');
    switch (action) {
      case 'add':
        const form = this.form;
        form.action = 'add';
        this.fields = _.get(form, 'fields');
        break;
      case 'edit':
        this.detail(JSON.parse(data));
        break;
      case 'delete':
        this.detail(JSON.parse(data));
        break;
      case 'cancel':
        this.form.action = 'list';
        break;

      default:
        break;
    }
  }

  getForm = () => {
    const form = this.form;
    form.__form = this.form.name;
    this.formService.getForm(form).subscribe((res: any) => {
      if (res && res.status) {
        const form: any = _.get(res, 'data');
        form.action = 'list';
        form.listType = 'grid';
        this.form = form;
        if (form && form.template) {
          this.card = form.template;
        }
        this.fields = _.get(form, 'fields');
        this.list();
      }
    })
  }

  detail = (params: any) => {
    params.module = this.form.code;
    params.__form = this.form.code;
    const data: any = _.extend(params, {
      __form: params.module,
      __name: params.module,
      selectIds: [_.get(params, _.get(this.fieldService.setFields(this.fields).getPrimaryField(), 'name'))],
    })
    const api = this.formService.detail(params);
    api.subscribe((res: any) => {
      if (res && res.status) {
        const form = this.form;
        this.fields = _.get(form, 'fields');
        this.fields = this.fieldService.setFields(this.fields).setValues(_.get(res, 'data')).setFieldsValues().getFields();
        // console.log(this.fields);

        // console.log(this.form);
        this.openPopup(this.addMember);
        // this.modalService.open('addMember', { centered: true, size: 'lg'  });
      }
    })
  }

  list = () => {
    // const api = params.family_id ? this.formService.update(params) : this.formService.create(params);
    // const params: any = _.cloneDeep(this.form);
    const fields = this.fields;
    const columns = _.chain(fields)
      .filter(data => data.datatable)
      .reduce((result, field, key) => {
        const column = {
          title: field.label,
          data: field.name,
          name: field.name,
          type: field.field_type,
        }

        const cols = [
          'budget',
          'hq_budget',
          'net_budget',
          'cum_roi_amt',
          'cum_invt_amt',
          'amount',
          'amt',
          'investment_amount',

        ];



        return result.concat(column);
      }, []).value();

    const sort: any = this.paginator.sort;
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
    params.__name = this.form.code;
    params.__form = this.form.code;
    params.profile = index === 2 ? true : false;
    this.paginator.draw = this.paginator.draw + 1;
    params.draw = this.paginator.draw;
    params.start = this.paginator.draw === 1 ? 0 : this.paginator.pageSize * this.paginator.pageIndex;
    params.length = this.paginator.pageSize;
    params.search = {};
    params.search['value'] = this.paginator.search;
    params.search['regex'] = false;



    // console.log(params);

    this.formService.datatable(params).subscribe((res: any) => {
      if (res && res.data) {
        this.items = _.get(res, 'data');
        this.paginator.length = _.get(res, 'recordsFiltered');
        this.paginator.listFields = this.getListField();
      }
    })
  }

  delete = (params: any) => {
    params.module = this.form.code;
    params.__form = this.form.code;
    const primaryId = _.get(params, _.get(this.fieldService.setFields(this.fields).getPrimaryField(), 'name'));
    const data: any = _.extend(params, {
      __form: params.module,
      __name: params.module,
      selectIds: [primaryId],
    })
    const api = this.formService.delete(params);

    api.subscribe((res: any) => {
      if (res && res.status) {
        const form: any = _.cloneDeep(this.form);
        form.action = 'list';
        this.form = form;
        this.fields = this.fieldService.resetValues().getFields();
        this.list();
      }
    })
  }

  save = (modal) => {
    const fields = this.fields;

    const errors = this.fieldService.setFields(this.fields).validate().getErrors();

    if (this.fieldService.getErrorsCount()) {
      this.fieldService.setToastr();
    }
    const params = this.fieldService.getJsonData();
    const primaryId = _.get(params, _.get(this.fieldService.getPrimaryField(), 'name'));
    // params.module = this.form.code;
    params.__form = this.form.code;
    const api = primaryId ? this.formService.update(params) : this.formService.create(params);

    api.subscribe((res: any) => {
      if (res && res.status) {
        const form: any = _.cloneDeep(this.form);
        form.action = 'list';
        this.form = form;
        const fields = this.fieldService.resetValues().getFields();
        this.fields = fields;
        this.paginator.pageIndex = 0;
        this.list();
        modal.close();
      }
    })
  }

  getTableField = () => {
    const fields = this.fields;
    // const listingFields = this.fieldService.setFields(this.fields).validate().getErrors();
    const listFields = _.chain(fields).filter(data => data.datatable)
      .value();
    this.paginator.displayedColumns = _.union(_.values(_.mapValues(listFields, 'name')), ['more']);
    return listFields;
  }

  getListField = () => {
    const fields = this.fields;

    // const listingFields = this.fieldService.setFields(this.fields).validate().getErrors();
    const listFields = _.chain(fields).filter(data => data.datatable)
      .reject((res) => _.get(res, 'name') === _.get(this.fieldService.setFields(this.fields).getPrimaryField(), 'name'))
      .orderBy(['field_type'], ['desc'])
      .mapValues('name')
      .values()
      .value();


    return listFields;
  }

  getListFieldValue = (item, index) => {
    const field_name = _.get(this.paginator, 'listFields[' + index + ']');
    return _.get(item, field_name)
  }

  handlePageEvent = (event: any) => {
    this.paginator.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.sort = {};
    this.list()
  }

  search = () => {
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.paginator.sort = {};
    this.list();
  }

  onSearchClear = () => {
    this.paginator.search = "";
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.paginator.sort = {};
    this.list();
  }

  sortData = (event: any) => {
    this.paginator.sort = event;
    this.paginator.pageIndex = 0;
    this.list();
  }


  // Modal 
  openPopup(content) {
    //  console.log(content);
    //  console.log(this.form);

    this.modalService.open(content, { windowClass: 'bottom-sheet animate__animated animate__bounceInUp', size: 'sm'  });
  }

  openBottomSheet(content) {
    this.modalService.open(content, { windowClass: 'bottom-sheet animate__animated animate__bounceInUp', size: 'sm'  });
    }

  getTimeAgo = (value) => {
    return this.utilitiesService.getTimeAgo(value);
  }
}
