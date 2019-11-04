import { CalDate } from '../data-objects/cal-date';
import { Appointment } from '../data-objects/appointment';

export class NumberUtil {
    public static toDateCode(cd: CalDate): string {
        const ddString = (cd.dd < 10) ? (`0${cd.dd}`) : `${cd.dd}`;
        const mmString = (cd.mm < 10) ? (`0${cd.mm}`) : `${cd.mm}`;
        const yyyyString = `${cd.yyyy}`;

        return `${yyyyString}${mmString}${ddString}`;
    }

    public static toUsaDateFormat(cd: CalDate): string {
        const ddString = (cd.dd < 10) ? (`0${cd.dd}`) : `${cd.dd}`;
        const mmString = (cd.mm < 10) ? (`0${cd.mm}`) : `${cd.mm}`;
        const yyyyString = `${cd.yyyy}`;

        return `${mmString}/${ddString}/${yyyyString}`;
    }

    public static getIdProp(a: Appointment): string {
        if ('id' in a && !!a.id && a.id.length > 0) {
            return a.id;
        }
        else if ('_id' in a && !!a._id && a._id.length > 9) {
            return a._id;
        }
        else {
            return '';
        }
    }
}