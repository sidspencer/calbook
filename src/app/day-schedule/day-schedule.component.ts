import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TimeVal, QsParam, DialogResult } from '../data-objects/enums';
import { CalendarService } from '../services/calendar.service';
import { CalDate } from '../data-objects/cal-date';
import { Timeslot } from '../data-objects/timeslot';
import { Appointment } from '../data-objects/appointment';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentEditorComponent } from '../appointment-editor/appointment-editor.component';
import { NumberUtil } from '../util-objects/number-util';
import { ObjectId } from '../data-objects/object-id';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnInit {
  protected calDate: CalDate;
  protected formattedDate: string;
  protected appointments: Appointment[] = [];
  protected timeslots: Timeslot[] = [];
  protected dialog: any = undefined;

  constructor(protected activatedRoute: ActivatedRoute,
              protected calendarService: CalendarService,
              protected appointmentEditor: MatDialog) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any[]) => {
      this.calDate = new CalDate(params[QsParam.DateCode]);
      this.formattedDate = NumberUtil.toUsaDateFormat(this.calDate);
      this.rebuildSchedule();
    });
  }

  protected rebuildSchedule(): void {
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
  }

  protected editAppointment(a: Appointment) {
    if (!!this.dialog) {
      return;
    }

    this.dialog = this.appointmentEditor.open(AppointmentEditorComponent, {
      data: a
    });

    this.dialog.afterClosed().subscribe((result: DialogResult) => {
      this.dialog = undefined;
      console.log('[day-schedule] closed dialog.');

      if (result === DialogResult.Saved) {
        if (!!a.id) {
          this.calendarService.updateAppointment(a).subscribe((res: any) => {
            this.rebuildSchedule();
          });
        } else {
          this.calendarService.createAppointment(a).subscribe((res: any) => {
            this.rebuildSchedule();
          });
        }
      } else if (result === DialogResult.Deleted) {
        this.calendarService.deleteAppointment(a).subscribe((res: any) => {
          this.rebuildSchedule();
        });
      }
    });
  }

  protected scheduleAppointment(t: Timeslot) {
    let appointment: Appointment = new Appointment(new ObjectId('', 1, 1, 1, 1), this.calDate, t, '');
    this.editAppointment(appointment);
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
