import { Appointment } from './appointment';
import { CalDate } from './cal-date';
import { Timeslot } from './timeslot';
import { ObjectId } from './object-id';

describe('Appointment', () => {
  it('should create an instance', () => {
    expect(new Appointment(new ObjectId('0', 0, 0, 0, 0), new CalDate('20010101'), new Timeslot(1), '')).toBeTruthy();
  });
});
