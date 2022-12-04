import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as menus from '../../../core/json/menus.json';
import * as _ from 'lodash';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ProfileService } from 'src/app/core/api/profile/profile.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  panelOpenState = false;
  showFiller = false;
  mainHeader: string = "";
  menus = [];
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isCollapsed: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  
  constructor(
    private spinner: NgxSpinnerService,
    private breakpointObserver: BreakpointObserver,
    private storageService: StorageService,
    private loaderService: LoaderService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.menus = _.get(menus, 'default');
    // console.log(this.menus);
    this.loaderService.getEmitter('mainHeader').subscribe((res) => {
      this.mainHeader = res;
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
    })

    // this.profileService.menu().subscribe((res: any) => {
    //   if (res && res.status) {
    //     this.menus = res.data;
    //     // console.log(this.menus);
        
    //   }
    // })

    
  }

  ngAfterViewInit = () => {
    
  }

  ngAfterContentChecked = () => {
    
  }

  logout() {
    const user: any = this.storageService.get('user');
    user.startDateTime = new Date(new Date().toUTCString());
    this.router.navigate(['']).then((result) => {
      if (result) {
        localStorage.clear();
      }
    });
  }

  redirect = (route: any) => {
    const navigationExtras: NavigationExtras = {
      state: {
        refresh: new Date().getTime()
      }
    }
    const url = this.getMenuUrl(route.url);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
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
    return _.replace(url, '#!/common', '/main');
  }

  sideNavToggle = ($event: any) => {
    console.log('sideNavToggle');
    this.isCollapsed = !this.isCollapsed;
  }
}