type Time = [number, number];

export default class Timer {
  private isRunningStatus: boolean;

  private startTime: Time;

  private endTime: Time;

  constructor(private title: string = '') {
    this.isRunningStatus = false;
    this.startTime = null;
    this.endTime = null;
  }

  public start(): Timer {
    if (this.isRunningStatus) return this;

    this.startTime = process.hrtime();
    this.isRunningStatus = true;

    return this;
  }

  public stop(): Timer {
    if (!this.isRunningStatus) return this;

    this.endTime = process.hrtime(this.startTime);
    this.isRunningStatus = false;

    return this;
  }

  public clear(): Timer {
    this.isRunningStatus = false;
    this.startTime = null;
    this.endTime = null;

    return this;
  }

  public isRunning(): boolean {
    return this.isRunningStatus;
  }

  public minutes(): number {
    if (this.endTime === null) {
      throw new Error(
        'Timer is not able to format seconds when timer is not ended.',
      );
    }

    return Math.floor(this.endTime[0] / 60);
  }

  public seconds(): number {
    if (this.endTime === null) {
      throw new Error(
        'Timer is not able to format seconds when timer is not ended.',
      );
    }

    return this.endTime[0];
  }

  public milliseconds(): number {
    if (this.endTime === null) {
      throw new Error(
        'Timer is not able to format milliseconds when timer is not ended.',
      );
    }

    return Math.floor(this.endTime[0] * 1000 + this.endTime[1] / 1000000);
  }

  public format(
    template = "%m 'minute(s)' and %s 'second(s)' (%ms'ms')",
  ): string {
    if (this.endTime === null) {
      throw new Error('Timer is not able to format when timer is not ended.');
    }

    const minutes = this.minutes();
    let seconds = this.seconds();
    const milliseconds = this.milliseconds();

    if (template.includes('%m')) {
      seconds -= minutes * 60;
    }

    return template
      .replace('%title', this.title)
      .replace('%m', String(minutes).padStart(2, '0'))
      .replace('%s', String(seconds).padStart(2, '0'))
      .replace('%ms', String(milliseconds).padStart(2, '0'))
      .replace(/'/g, '');
  }
}
