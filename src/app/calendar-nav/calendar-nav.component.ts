import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CalDate } from '../data-objects/cal-date';
import { NumberUtil } from '../util-objects/number-util';
import { QsParam } from '../data-objects/enums';

@Component({
  selector: 'app-calendar-nav',
  templateUrl: './calendar-nav.component.html',
  styleUrls: ['./calendar-nav.component.scss']
})
export class CalendarNavComponent implements OnInit {
  protected calDate: CalDate = new CalDate('20010101');

  constructor(protected router: Router, protected activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any[]) => {
      const newDate = new CalDate(params[QsParam.DateCode]);
      this.calDate.yyyy = newDate.yyyy;
      this.calDate.mm = newDate.mm;
      this.calDate.dd = newDate.dd;
    });
  }

  protected displayDaySchedule(): void {
    const dateCode: string = NumberUtil.toDateCode(this.calDate);
    this.router.navigateByUrl(`/day-schedule/${dateCode}`);
  }
}
