import {Component, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
// import {NavService} from '../nav.service';
import { MatSidenav } from '@angular/material/sidenav';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as _ from 'lodash';


@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidenavMenuComponent implements OnInit {

  @Input() menu: any;
  @Input() isCollapsed: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  redirect = (route: any) => {
    const navigationExtras: NavigationExtras = {
      state: {
        name: '',
        refresh: Date.now()
      }
    }
    const url = this.getMenuUrl(route.url);
    navigationExtras.state.name = _.last(_.split(url, '/'));
    console.log(this.router.url);
    console.log(url);
    console.log(navigationExtras.state);
    
    // this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate([url], navigationExtras)
    this.router.navigateByUrl('/main', {skipLocationChange: true}).then(()=>
    this.router.navigate([url], navigationExtras));
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  getMenuUrl = (url: string) => {
    return _.replace(_.replace(_.replace(_.replace(url, '#!/', '/'), 'common', 'main'), '/admin/role', '/main/admin/role'), '/admin/field', '/main/admin/field');
  }
}