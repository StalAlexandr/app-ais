import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { UploaddocComponent } from './uploaddoc/uploaddoc.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DragDropDirective} from './drug-drop.directive';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaddocComponent,
    DragDropDirective,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
