import { CalDate } from '../data-objects/cal-date';

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
}