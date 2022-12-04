import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  //Modal


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  collapsed = true;
  closeResult: string; //Modal

  public tabs = [
    {
      code: 'profile',
      name: 'Profile',
      link: '/main/user/profile'
    },
    // {
    //   code: 'chat',
    //   name: 'Chat',
    //   link: '/main/user/chat'
    // },
    {
      code: 'family',
      name: 'Family',
      link: '/main/user/family'
    },
    {
      code: 'vehicle',
      name: 'Vehicle',
      link: '/main/user/vehicle'
    },
    {
      code: 'visitor',
      name: 'Visitor',
      link: '/main/user/visitor'
    },
    {
      code: 'vendor',
      name: 'Vendor',
      link: '/main/user/vendor'
    },
    // {
    //   code: 'education',
    //   name: 'Education',
    //   link: '/main/user/education'
    // },
    // {
    //   code: 'work-experience',
    //   name: 'Work Experience',
    //   link: '/main/user/work-experience'
    // },
    {
      code: 'payment',
      name: 'Payment',
      link: '/main/user/payment'
    },
    // {
    //   code: 'change_password',
    //   name: 'Change Password',
    //   link: '/main/user/change-password'
    // }
  ]

  constructor(
    private router: Router, 
    private modalService: NgbModal //Modal
        ) { }

  ngOnInit(): void {
  }

  redirect = (route: any) => {
    const navigationExtras: NavigationExtras = {
      state: {
        refresh: new Date().getTime()
      }
    }
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([route.link], navigationExtras));
  }

  // Modal
  openPopup(content) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  // Modal ends

}
