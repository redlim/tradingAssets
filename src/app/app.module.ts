import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { ItemComponent } from './item.component';
import {AssetsService} from "./assets/services/assets.service";
import {HeaderComponent} from './header/header.component'
import {AssetsComponent} from './assets/assets.component'
import {AssetsEditComponent} from './assets/assets.edit.component'
import {AssetDetailComponent} from './assets/assets.detail.component'
import {routing} from "./app.routing";
import { MaterialModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    AssetDetailComponent,
    AssetsComponent,
    AssetsEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot(),
    ChartsModule
  ],
  providers: [AssetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
