import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileService } from '../../../../core/api/profile/profile.service';
import * as menus from '../../../../core/json/menus.json';
import * as _ from 'lodash';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() isCollapsed: any;
  menus = [];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver,private profileService: ProfileService) { 
    // this.profileService.menu().subscribe((res: any) => {
    //   if (res && res.status) {
    //     this.menus = res.data;
    //     // console.log(this.menus);
        
    //   }
    // });
    // this.menus = _.get(menus, 'default');
    // console.log(this.menus);
    
  }

  ngOnInit(): void {
    console.log('sidenav');
    
  }

  toggleSidebar() {
    console.log('hi');
    
    this.isCollapsed = !this.isCollapsed;
  }

  fromMainToSideNavToggle = ($event: any) => {
    // console.log('hi');
    this.isCollapsed = !this.isCollapsed;
    // this.toSideNavToggle.emit({

    // });
  }

}
