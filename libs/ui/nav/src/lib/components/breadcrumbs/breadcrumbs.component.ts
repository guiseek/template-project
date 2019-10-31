import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Crumb } from '../../interfaces/crumb.interface';

@Component({
  selector: 'ui-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input()
  readonly title: string;

  @Input()
  root = '/';

  @Input()
  // crumbs: ReadonlyArray<Crumb>;
  crumbs: Array<Crumb>;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public hasParams(breadcrumb: Crumb) {
    return !breadcrumb.params ? [breadcrumb.link] : Object.keys(breadcrumb.params).length ? [breadcrumb.link, breadcrumb.params] : [breadcrumb.link];
  }
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      console.log('crumbs event: ', event)
      // reset crumbs
      this.crumbs = [];
      // get the root of the current route
      let currentRoute: ActivatedRoute = this.route.root;
      // set the url to an empty string
      let url = this.root ? this.root : '';
      // iterate from activated route to children
      while (currentRoute.children.length > 0) {
        const childrenRoutes: ActivatedRoute[] = currentRoute.children;
        let breadCrumbLabel = '';

        // iterate over each children
        childrenRoutes.forEach(route => {
          // Set currentRoute to this route
          currentRoute = route;

          // Verify this is the primary route
          if (route.outlet !== PRIMARY_OUTLET) {
            return;
          }

          const hasData = route.routeConfig && route.routeConfig.data;
          const hasDynamicBreadcrumb: boolean = route.snapshot.params.hasOwnProperty(
            'breadcrumb'
          );

          if (hasData || hasDynamicBreadcrumb) {
            /*
            Verify the custom data property "breadcrumb"
            is specified on the route or in its parameters.
            Route parameters take precedence over route data
            attributes.
            */
            if (hasDynamicBreadcrumb) {
              breadCrumbLabel = route.snapshot.params[
                'breadcrumb'
              ].replace(/_/g, ' ');
            } else if (
              route.snapshot.data.hasOwnProperty('breadcrumb')
            ) {
              breadCrumbLabel = route.snapshot.data['breadcrumb'];
            }

            const routeURL: string = route.snapshot.url
              .map(segment => segment.path)
              .join('/');
            url += `/${routeURL}`;

            console.log('url: ', url)
            // Cannot have parameters on a root route
            if (routeURL.length === 0) {
              route.snapshot.params = {};
            }
            // Add breadcrumb
            const breadcrumb: Crumb = {
              name: breadCrumbLabel,
              params: route.snapshot.params,
              link: url
            };
            // Add the breadcrumb as 'prefixed'. It will appear before all breadcrumbs
            // if (route.snapshot.data.hasOwnProperty(PREFIX_BREADCRUMB)) {
            //   this.breadcrumbService.storePrefixed(breadcrumb);
            // } else {
            this.crumbs.push(breadcrumb);
            // }
          }
        })
      }
    })
  }
}
