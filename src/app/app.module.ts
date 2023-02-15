import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableListComponent } from './table-list/table-list.component';
import { TableFormComponent } from './table-form/table-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTableComponent } from './add-table/add-table.component';
import { EditTableComponent } from './edit-table/edit-table.component';


@NgModule({
  declarations: [
    AppComponent,
    TableListComponent,
    TableFormComponent,
    AddTableComponent,
    EditTableComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
