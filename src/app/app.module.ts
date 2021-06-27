import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CollectionFormComponent } from './collection-form/collection-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material-module/material.module";
import { FileInputComponent } from './collection-form/file-input/file-input.component';
import { FileUploaderComponent } from './collection-form/file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    CollectionFormComponent,
    FileInputComponent,
    FileUploaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
