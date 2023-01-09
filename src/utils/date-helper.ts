import { DateTime, Duration } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

import { BartlebySettings } from '@/data/settings';

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
    _settings: BartlebySettings = new BartlebySettings();

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

    toLocaleString(val?: DateTime | string) : string {
        return this.ensureDateTime(val).setLocale(this._settings.locale).toLocaleString(DateTime.DATETIME_SHORT);
    }
}

export const DateHelper = new DateHelperBase();

