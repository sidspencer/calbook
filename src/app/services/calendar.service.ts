import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DaySchedule } from '../data-objects/day-schedule';
import { HttpClient } from '@angular/common/http';
import { CalDate } from '../data-objects/cal-date';
import { Appointment } from '../data-objects/appointment';
import { Timeslot } from '../data-objects/timeslot';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  deleteAppointment(a: Appointment): Observable<any> {
    return (this.http.delete(`http://localhost:5000/api/appointment/${a.id}`) as Observable<any>);
  }

  constructor(protected http: HttpClient) { }

  public fetchDaySchedule(date: CalDate): Observable<DaySchedule> {
    const mockDaySchedule = new DaySchedule();
    mockDaySchedule.calDate = date;
    mockDaySchedule.appointments = this.generateAppointments(date);

    return of(mockDaySchedule);
    // return this.http.get('/srv/day-schedule/');
  }

  public fetchAppointmentsByDate(date: CalDate): Observable<Appointment[]> {
    return (this.http.get(`http://localhost:5000/api/appointment/bydate/${date.toDateCode()}`) as Observable<Appointment[]>);
  }

  public fetchAllAppointments(): Observable<Appointment[]> {
    return (this.http.get('http://localhost:5000/api/appointment')) as Observable<Appointment[]>;
  }

  public updateAppointment(a: Appointment) {
    return (this.http.post('http://localhost:5000/api/appointment', { body: a }));
  }

  private generateAppointments(date: CalDate): Appointment[] {
    if (date.dd < 10) {
      return [new Appointment(date, new Timeslot(1), 'less than 10')];
    } else if (date.dd < 20) {
      return [
        new Appointment(date, new Timeslot(4), 'less than 20'),
        new Appointment(date, new Timeslot(6), 'less than 20'),
      ];
    } else {
      return [
        new Appointment(date, new Timeslot(11), 'less than 30'),
        new Appointment(date, new Timeslot(13), 'less than 30'),
        new Appointment(date, new Timeslot(16), 'less than 30'),
      ];
    }
  }
}
