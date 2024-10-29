import type { Loan } from "../types";

interface DateOptions {
    date: Intl.DateTimeFormatOptions;
    header: Intl.DateTimeFormatOptions;
    status: Intl.DateTimeFormatOptions;
    time: Intl.DateTimeFormatOptions;
}

const dateOptions: DateOptions = {
    date: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    },

    header: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    },

    status: {
        month: "numeric",
        year: "numeric",
        timeZone: "Europe/Moscow",
    },

    time: {
        hour: "numeric",
        minute: "numeric",
    },
};

export class TimePeriod {
    constructor(
        private readonly loans: Loan[],
        private readonly lastDate: string
    ) {}

    get result() {
        const milliseconds = Date.parse(this.lastDate);
        const lastDate = new Date(milliseconds);
        const result = [lastDate];

        const monthsNumber = this.#getMonthsNumber();

        for (let i = 1; i < monthsNumber; i++) {
            let previous = result[i - 1];

            let date = new Date(previous.getTime());
            date.setMonth(date.getMonth() - 1);

            result.push(date);
        }

        return result;
    }

    #getMonthsNumber() {
        const startDate = this.#getStartDate();
        const lastDate = this.lastDate;

        const [startMonth, startYear] = this.#defineMonthYear(startDate);
        const [lastMonth, lastYear] = this.#defineMonthYear(lastDate);

        return (lastYear - startYear) * 12 + (lastMonth + 1) - startMonth;
    }

    #getStartDate() {
        return this.loans?.reduce((result, { firstPaymentDate }) => {
            return result > firstPaymentDate ? firstPaymentDate : result;
        }, this.lastDate);
    }

    #defineMonthYear(isoDate: string) {
        if (!isoDate) return [];

        const dateFormat = getDateFormat("ru", "status");
        const milliseconds = Date.parse(isoDate);

        return dateFormat
            .format(milliseconds)
            .split(".")
            .map((item) => Number(item));
    }
}

export function getDateFormat(locale: string, type: keyof DateOptions) {
    const options = dateOptions[type];
    return new Intl.DateTimeFormat(locale, options);
}
