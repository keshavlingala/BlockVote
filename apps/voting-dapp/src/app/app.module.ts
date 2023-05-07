import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {AuthGuard} from './guards/auth.guard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgWeb3Module} from 'ng-web3';
import {HttpClientModule} from "@angular/common/http";
import {DatabaseService} from "./database.service";
import {DbadminComponent} from './components/dbadmin/dbadmin.component';
import {ManualComponent} from './components/manual/manual.component';
import {ComponentsModule} from "./components/components.module";
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('./views/login-page/login-page.module').then(
        (mod) => mod.LoginPageModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./views/campaigns-page/campaigns-page.module').then(
        (mod) => mod.CampaignsPageModule
      ),
  },
  {
    path: 'dbadmin',
    component: DbadminComponent,
  },
  {
    path: 'manual',
    component: ManualComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [AppComponent, ManualComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgWeb3Module.forRoot(),
    HttpClientModule,
    ComponentsModule,
    MatExpansionModule,
  ],
  providers: [
    HttpClientModule,
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
