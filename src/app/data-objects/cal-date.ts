import { NumberUtil } from '../util-objects/number-util';

export class CalDate {
    public dd: number = 1;
    public mm: number = 1;
    public yyyy: number = 2000;

    constructor(dateCode: string) {
        this.yyyy = parseInt(dateCode.substring(0, 4), 10);
        this.mm = parseInt(dateCode.substring(4, 6), 10);
        this.dd = parseInt(dateCode.substring(6), 10);
    }

    public toDateCode(): string {
        return NumberUtil.toDateCode(this);
    }

    public toUsaDateFormat(): string {
        return NumberUtil.toUsaDateFormat(this);

    }
}
