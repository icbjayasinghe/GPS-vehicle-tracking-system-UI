import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VehicleListComponent} from '../../vehicle-list/vehicle-list.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { CheckPointListComponent} from '../../check-point-list/check-point-list.component';
import { VehicleMapComponent} from '../../vehicle-map/vehicle-map.component';
import { ReportComponent } from '../../report/report.component';
import {AuthGuard} from '../../auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent, canActivate: [ AuthGuard ]},
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [ AuthGuard ]  },
    { path: 'table-list',     component: TableListComponent, canActivate: [ AuthGuard ]  },
    { path: 'typography',     component: TypographyComponent, canActivate: [ AuthGuard ]  },
    { path: 'icons',          component: IconsComponent, canActivate: [ AuthGuard ]  },
    { path: 'maps',           component: MapsComponent, canActivate: [ AuthGuard ]  },
    { path: 'notifications',  component: NotificationsComponent, canActivate: [ AuthGuard ]  },
    { path: 'upgrade',        component: UpgradeComponent, canActivate: [ AuthGuard ]  },
    { path: 'vehicle-list',   component: VehicleListComponent, canActivate: [ AuthGuard ]  },
    { path: 'user-list',      component: UserListComponent, canActivate: [ AuthGuard ]  },
    { path: 'check-point-list', component: CheckPointListComponent, canActivate: [ AuthGuard ] },
    { path: 'vehicleMap', component: VehicleMapComponent, canActivate: [ AuthGuard ] },
    { path: 'reports', component: ReportComponent, canActivate: [AuthGuard]}
];
