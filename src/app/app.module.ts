import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';
import { UserService } from '@app/core/user.service';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // tours
    StaticModule,
    SettingsModule,

    // app
    AppRoutingModule,

    ReactiveFormsModule,

    FormlyModule.forRoot(),

    FormlyMaterialModule,

    GooglePlaceModule,

    AgGridModule.withComponents([])
  ],
  declarations: [AppComponent],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
