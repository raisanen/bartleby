import { DateTime, Duration } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

class UniqueTimer {
    id: string;
    start: DateTime;
    end?: DateTime;

    constructor(id?: string) {
        this.id = id || uuidv4();
        this.start = DateTime.utc();
    }

    elapsed(): Duration {
        return (this.end || DateTime.utc()).diff(this.start);
    }

    stop(): UniqueTimer {
        this.end = DateTime.utc();
        return this;
    }
}

class DateHelperBase {
    createTimer(): UniqueTimer {
        return new UniqueTimer();
    }

    now(): DateTime {
        return DateTime.utc();
    }

    nowString(): string {
        return this.now().toISO();
    }

    ensureString(val?: DateTime | string): string {
        return this.ensureDateTime(val).toISO();
    }
    ensureDateTime(val?: DateTime | string): DateTime {
        return val ? ((val instanceof DateTime) ? val : DateTime.fromISO(val)) : this.now();
    }
}

export const DateHelper = new DateHelperBase();

