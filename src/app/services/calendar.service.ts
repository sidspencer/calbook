import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CalDate } from '../data-objects/cal-date';
import { Appointment } from '../data-objects/appointment';
import { NumberUtil } from '../util-objects/number-util';

const baseUrl = 'http://localhost:3003';
//const baseUrl = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  deleteAppointment(a: Appointment): Observable<any> {
    let aId = NumberUtil.getIdProp(a);
    return (this.http.delete(`${baseUrl}/api/appointment/${aId}`) as Observable<any>);
  }

  constructor(protected http: HttpClient) { }

  public fetchAppointmentsByDate(date: CalDate): Observable<Appointment[]> {
    return (this.http.get(`${baseUrl}/api/appointment/bydate/${date.toDateCode()}`) as Observable<Appointment[]>);
  }

  public fetchAllAppointments(): Observable<Appointment[]> {
    return (this.http.get(`${baseUrl}/api/appointment`)) as Observable<Appointment[]>;
  }

  public createAppointment(a: Appointment): Observable<any> {
    return (this.http.put(`${baseUrl}/api/appointment`, a) as Observable<any>);
  }

  public updateAppointment(a: Appointment): Observable<any> {
    return (this.http.post(`${baseUrl}/api/appointment/`, a) as Observable<Appointment>);
  }
}
