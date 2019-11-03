import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CalDate } from '../data-objects/cal-date';
import { Appointment } from '../data-objects/appointment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  deleteAppointment(a: Appointment): Observable<any> {
    return (this.http.delete(`http://localhost:5000/api/appointment/${a.id}`) as Observable<any>);
  }

  constructor(protected http: HttpClient) { }

  public fetchAppointmentsByDate(date: CalDate): Observable<Appointment[]> {
    return (this.http.get(`http://localhost:5000/api/appointment/bydate/${date.toDateCode()}`) as Observable<Appointment[]>);
  }

  public fetchAllAppointments(): Observable<Appointment[]> {
    return (this.http.get('http://localhost:5000/api/appointment')) as Observable<Appointment[]>;
  }

  public createAppointment(a: Appointment): Observable<any> {
    return (this.http.put('http://localhost:5000/api/appointment', a) as Observable<any>);
  }

  public updateAppointment(a: Appointment): Observable<any> {
    return (this.http.post(`http://localhost:5000/api/appointment/`, a) as Observable<Appointment>);
  }
}
