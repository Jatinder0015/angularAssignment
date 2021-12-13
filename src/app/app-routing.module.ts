import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateLoginGuard } from './core/routeGuards/validate-login.guard';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'angularAssignment' },
  { path: 'angularAssignment', component: HomeComponent },
  // {path: 'admin', canActivate:[ValidateLoginGuard,AdminPathGuardGuard] ,
  // loadChildren: () => import("./modules/airline-admin/airline-admin.module").then((m) => m.AirlineAdminModule),
  // },
  // canActivate:[ValidateLoginGuard] ,
  {
    path: 'dashboard',  canActivate:[ValidateLoginGuard] ,
    loadChildren: () => import("./modules/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  // { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
