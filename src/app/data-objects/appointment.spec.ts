import { Appointment } from './appointment';
import { CalDate } from './cal-date';
import { Timeslot } from './timeslot';

describe('Appointment', () => {
  it('should create an instance', () => {
    expect(new Appointment('23423442342234', new CalDate('20010101'), new Timeslot(1), '')).toBeTruthy();
  });
});
