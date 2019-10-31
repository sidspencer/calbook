import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DayScheduleComponent } from './day-schedule/day-schedule.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CalendarNavComponent } from './calendar-nav/calendar-nav.component';
import { AppointmentEditorComponent } from './appointment-editor/appointment-editor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DayScheduleComponent,
    AppointmentComponent,
    CalendarNavComponent,
    AppointmentEditorComponent
  ],
  entryComponents: [
    AppointmentEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
