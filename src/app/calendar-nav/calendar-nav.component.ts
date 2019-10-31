import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CalDate } from '../data-objects/cal-date';

@Component({
  selector: 'app-calendar-nav',
  templateUrl: './calendar-nav.component.html',
  styleUrls: ['./calendar-nav.component.scss']
})
export class CalendarNavComponent implements OnInit {
  protected calDate: CalDate;

  protected dd: number = 1;
  protected mm: number = 1;
  protected yyyy: number = 2001;

  constructor(protected router: Router) { }

  ngOnInit() {
    this.calDate = new CalDate('20010101');
  }

  protected displayDaySchedule(): void {
    this.calDate.dd = this.dd;
    this.calDate.mm = this.mm;
    this.calDate.yyyy = this.yyyy;
    
    const dateString: string = this.calDate.toDateCode();
    this.router.navigateByUrl(`/day-schedule/${dateString}`);
  }
}
