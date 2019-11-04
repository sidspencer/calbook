import { CalDate } from './cal-date';
import { Timeslot } from './timeslot';

export class Appointment {
    public id: string;
    public _id: string;
    public calDate: CalDate;
    public timeslot: Timeslot;
    public notes: string;

    constructor(id: string, calDate: CalDate, timeslot: Timeslot, notes: string) {
        this.id = id;
        this._id = id;
        this.calDate = calDate;
        this.timeslot = timeslot;
        this.notes = notes;
    }
}
