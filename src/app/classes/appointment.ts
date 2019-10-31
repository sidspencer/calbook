import { CalDate } from './cal-date';
import { Timeslot as Timeslot } from './timeslot';

export class Appointment {
    public id: any;
    public calDate: CalDate;
    public timeslot: Timeslot;
    public notes: string;

    constructor(calDate: CalDate, timeslot: Timeslot, notes: string) {
        this.calDate = calDate;
        this.timeslot = timeslot;
        this.notes = notes;
    }
}
