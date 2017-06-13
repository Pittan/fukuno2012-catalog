import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppComponent } from './app.component';
import { AppCellComponent } from './app-cell/app-cell.component';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppCellComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
