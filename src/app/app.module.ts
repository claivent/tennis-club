import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableFormComponent } from './tables/table-form/table-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddTableComponent } from './tables/add-table/add-table.component';
import { EditTableComponent } from './tables/edit-table/edit-table.component';
import { HomeComponent } from './tables/home/home.component';
import { TableComponent } from './tables/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { DatePickerComponent } from './tables/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePicker2Component } from './tables/date-picker2/date-picker2.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CalendarComponent} from "./tables/calendar/calendar.component";

registerLocaleData(localeCs);


@NgModule({ declarations: [
        AppComponent,
        TableFormComponent,
        AddTableComponent,
        EditTableComponent,
        HomeComponent,
        TableComponent,
        DatePickerComponent,
        DatePicker2Component,
        CalendarComponent

    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        NgbDropdownModule,
        NgbAlertModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory,
        }),

  ],
  providers: [{ provide: LOCALE_ID, useValue: 'cs-CZ' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
