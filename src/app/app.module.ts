import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {ChartModule } from 'angular2-highcharts';
import { AngularFireModule } from 'angularfire2';


import { AppComponent } from './app.component';
import { ItemComponent } from './item.component';
import {AssetsService} from "./assets/services/assets.service";
import {HeaderComponent} from './header/header.component'
import {AssetsComponent} from './assets/assets.component'
import {AssetDetailComponent} from './assets/assets.detail.component'
import {DataTable} from './components/table/datatable.component'
import {ColumnComponent} from './components/table/column.component'
import {BoxComponent} from './components/box/box.component'


import {routing} from "./app.routing";
import { MaterialModule } from '@angular/material';

export function highchartsFactory() {
  return require('highcharts');
}
export const   firebaseConfig = {
  apiKey: "AIzaSyBlmeQ4vEuNm6OGApweq3WdC2FFjtGi4Vo",
  authDomain: "etsassets.firebaseapp.com",
  databaseURL: "https://etsassets.firebaseio.com",
  storageBucket: "etsassets.appspot.com",
  messagingSenderId: "315987088863"
};


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    AssetDetailComponent,
    AssetsComponent,
    HeaderComponent,
    DataTable,
    ColumnComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot(),
    ChartModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [{
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  },AssetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
