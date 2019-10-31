import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeVal } from '../data-objects/enums';
import { CalendarService } from '../services/calendar.service';
import { CalDate } from '../data-objects/cal-date';
import { DaySchedule } from '../data-objects/day-schedule';
import { Timeslot } from '../data-objects/timeslot';
import { Appointment } from '../data-objects/appointment';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentEditorComponent } from '../appointment-editor/appointment-editor.component';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnInit {
  protected calDate: CalDate;
  protected appointments: Appointment[] = [];
  protected timeslots: Timeslot[] = [];
  protected dialog: any = undefined;

  constructor(protected activatedRoute: ActivatedRoute,
              protected calendarService: CalendarService,
              protected appointmentEditor: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any[]) => {
      this.calDate = new CalDate(params['dateString']);

      this.calendarService.fetchAppointmentsByDate(this.calDate).subscribe((appointments: Appointment[]) => {
        this.appointments.splice(0);
        appointments.forEach((a: Appointment) => {
          this.appointments.push(a);
        });

        this.timeslots = [];
        for (let i = 0; i < TimeVal.HoursInDay; i++) {
          this.timeslots.push(new Timeslot(i));
        }
      });
    });
  }

  protected editAppointment(a: Appointment) {
    if (!!this.dialog) {
      return;
    }

    this.dialog = this.appointmentEditor.open(AppointmentEditorComponent, {
      data: a
    });

    this.dialog.afterClosed().subscribe((result: number) => {
      this.dialog = undefined;
      console.log('[day-schedule] closed dialog.');
    });
  }

  protected getAppointmentByTimeslot(t: Timeslot) {
    for (const a of this.appointments) {
        if (a.timeslot.hour === t.hour) {
            return a;
        }
    }

    return undefined;
  }
}
