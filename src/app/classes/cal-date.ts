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
        let ddString = (this.dd < 10) ? (`0${this.dd}`) : `${this.dd}`;
        let mmString = (this.mm < 10) ? (`0${this.mm}`) : `${this.mm}`;
        let yyyyString = `${this.yyyy}`;

        return `${yyyyString}${mmString}${ddString}`;
    }

    public toUsaDateFormat(): string {
        let ddString = (this.dd < 10) ? (`0${this.dd}`) : `${this.dd}`;
        let mmString = (this.mm < 10) ? (`0${this.mm}`) : `${this.mm}`;
        let yyyyString = `${this.yyyy}`;

        return `${mmString}/${ddString}/${yyyyString}`;
    }
}
