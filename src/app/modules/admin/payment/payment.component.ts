import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaymentService } from '../../../core/api/payment/payment.service';
import { FormBuilder, NgForm } from '@angular/forms';
import * as _ from 'lodash';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() data: any = 'initiated';
  page: any = {
    view: 'initiated'
  };

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
  }

  initiated = () => {
    this.paymentService.initiated({
      "channel_id": "WEB",
      "txn_amount": 1,
      "return_url": "http://localhost:4200/main/user/payment/"
    }).subscribe((res) => {
      const data = _.get(res, 'data');
      // console.log(data);
      this.processing(data);
    })
  }

  processing = (data) => {
    this.page.url = this.paymentService.httpService.config.baseUrl + '/payment/processing';
    const params = _.map(data, (value, key) => {
      return {
        key,
        value
      }
    });

    this.page.params = params;

    this.page.view = 'processing';
    setTimeout(() => {
      const form: any = document.getElementById("myForm");
      form.submit();
    }, 1000);
  }

  completed = () => {

  }
}
