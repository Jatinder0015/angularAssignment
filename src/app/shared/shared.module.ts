import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// import { AngularMaterialModule } from '../angular-material.module';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
    // AngularFontAwesomeModule
    // AngularMaterialModule,
    // MatToolbarModule
  ],
 
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
