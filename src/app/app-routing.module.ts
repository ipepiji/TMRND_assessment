import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService as AuthGuard } from './@core/guard/auth-guard.service';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'four-oh-four', pathMatch: 'full' },
  { path: 'four-oh-four', component: NotFoundComponent },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
