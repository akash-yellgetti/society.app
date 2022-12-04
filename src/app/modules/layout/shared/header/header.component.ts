import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { LoaderService } from 'src/app/core/services/loader.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mainHeader: string = "Main Header";
  collapsed = true;
  
  @Input() isHandset: any;
  @Input() drawerRef: MatDrawer;
  @Input() drawerChatRef: MatDrawer;
  @Input() isCollapsed: boolean;
  @Output() toSideNavToggle: EventEmitter<any> = new EventEmitter();
  constructor(private loaderService: LoaderService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.loaderService.getEmitter('mainHeader').subscribe((res) => {
      this.mainHeader = res;
    })
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

  toggle = () => {
    
    console.log(this.isHandset);
    if(this.isHandset){
      this.drawerRef.toggle();
    } else {
      this.toSideNavToggle.emit();
      // this.isCollapsed = !this.isCollapsed;
    }
  }

  toggleChat = () => {
    console.log(this.isHandset);
    // console.log(this.chatRef);
    
    // if(this.isHandset){
      this.drawerChatRef.toggle();
    // } else {
    //   this.toSideNavToggle.emit();
    //   // this.isCollapsed = !this.isCollapsed;
    // }
  }

}
