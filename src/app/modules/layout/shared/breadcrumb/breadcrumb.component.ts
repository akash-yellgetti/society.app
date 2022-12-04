import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, distinctUntilChanged, map, subscribeOn } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})

export class BreadcrumbComponent implements OnInit {


  public breadcrumbs: Breadcrumb[];

  /**
  /*.filter(event => event instanceof NavigationEnd)
 .distinctUntilChanged()
 .map(event =>  this.buildBreadCrumb(this.activatedRoute.root)); */

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let breadcrumb: Breadcrumb = {
      label: 'Home',
      url: ''
    };

    this.breadcrumbs = this.generateBreadCrumbs(this.router.url);

    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
    //   //set breadcrumbs
    //   let root: ActivatedRoute = this.route.root;
    //   this.breadcrumbs = this.getBreadcrumbs(root);
    //   this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
      
       
    // });

  }

  generateBreadCrumbs = (url: string) => {
    return _.reject(_.reduce(_.split(url, '/'), (arr, key) => {
      arr.push({
        key,
        label: _.replace(_.startCase(_.camelCase(key)), / /g, ' ')
      })
      return arr;
    }, []), (res) => res && !res.key)
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'title';
debugger
    //get the child routes
    let children: ActivatedRoute[] = route.children;
    console.log(this.router.url);
    console.log(route);
    console.log(route.children);

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length==0) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
  
      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }



}

export interface Breadcrumb{
  label: string;
    url: string;
}