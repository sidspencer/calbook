export class ObjectId {
    public creationTime: string;
    public timestamp: number;
    public machine: number;
    public pid: number;
    public increment: number;

    constructor(creationTime: string, timestamp: number, machine: number, pid: number, increment: number) {
        this.creationTime = creationTime;
        this.timestamp = timestamp;
        this.machine = machine;
        this.pid = pid;
        this.increment = increment;
    }
}
