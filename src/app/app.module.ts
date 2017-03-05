import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {ChartModule } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { ItemComponent } from './item.component';
import {AssetsService} from "./assets/services/assets.service";
import {HeaderComponent} from './header/header.component'
import {AssetsComponent} from './assets/assets.component'
import {AssetsEditComponent} from './assets/assets.edit.component'
import {AssetDetailComponent} from './assets/assets.detail.component'
import {DataTable} from './components/table/datatable.component'
import {ColumnComponent} from './components/table/column.component'
import {BoxComponent} from './components/box/box.component'


import {routing} from "./app.routing";
import { MaterialModule } from '@angular/material';

export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    AssetDetailComponent,
    AssetsComponent,
    AssetsEditComponent,
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
    ChartModule
  ],
  providers: [{
    provide: HighchartsStatic,
    useFactory: highchartsFactory
  },AssetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
