import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/core/api/payment/payment.service';
@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  public info: any;
  constructor(private router: Router,
    private route: ActivatedRoute,private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.Info(this.route.snapshot.params);
    
    
  }

  Info = (params) => {
    this.paymentService.info(params).subscribe((res) => {
      this.info = res.data;
      
    })
  }

}
