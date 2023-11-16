import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { ClientsComponent } from './components/clients/clients.component';
import { DevisComponent } from './components/devis/devis.component';
import { EntrepreneursComponent } from './components/entrepreneurs/entrepreneurs.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthenticationComponent } from './components/authentication/authentication.component';
import {AuthInterceptorService} from "./services/auth.interceptor.service";


const appRoutes: Routes = [
  { path: '', component: DevisComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'devis', component: DevisComponent },
  { path: 'entrepreneurs', component: EntrepreneursComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'auth',component: AuthenticationComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    DevisComponent,
    EntrepreneursComponent,
    NavbarComponent,
    HeaderComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
