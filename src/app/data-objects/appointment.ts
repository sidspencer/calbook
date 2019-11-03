import { CalDate } from './cal-date';
import { Timeslot } from './timeslot';
import { ObjectId } from './object-id';

export class Appointment {
    public id: ObjectId;
    public calDate: CalDate;
    public timeslot: Timeslot;
    public notes: string;

    constructor(id: ObjectId, calDate: CalDate, timeslot: Timeslot, notes: string) {
        this.id = id;
        this.calDate = calDate;
        this.timeslot = timeslot;
        this.notes = notes;
    }
}
