import { useRef, useState } from "react";
import useInterval from "../utils/useInterval";
import './CountdownTimer.css';

enum ERRORS {
    NONE = '',
    NO_NAME = 'Missing name',
    INVALID_DATE_TIME = 'Invalid date/time format',
    PAST_DATE_TIME = 'Past date/time',
};

const validateName = (name: string) => name ? ERRORS.NONE : ERRORS.NO_NAME;
const validateDate = (dateString: string) => {
    const parsedDateString = Date.parse(dateString);
    if (parsedDateString) {
        const todaysDate = Date.now();
        if (todaysDate >= parsedDateString) {
            return ERRORS.PAST_DATE_TIME
        }
        return ERRORS.NONE;
    } else {
        return ERRORS.INVALID_DATE_TIME;
    }
};

const SECONDS_TO_MINUTES = 60;
const MINUTES_TO_HOUR = 60;
const HOURS_TO_DAY = 24;
const MAX_SECONDS_TO_SHOW = SECONDS_TO_MINUTES - 1;
const MAX_MINUTES_TO_SHOW = SECONDS_TO_MINUTES * (MINUTES_TO_HOUR - 1);
const MAX_HOURS_TO_SHOW = SECONDS_TO_MINUTES * MINUTES_TO_HOUR * (HOURS_TO_DAY - 1);

const getDifference = (dateString: string) => {
    const todaysDateTime = Date.now();
    const dateTimeToCompare = Date.parse(dateString);
    const differenceInTime = Math.floor((dateTimeToCompare - todaysDateTime) / 1000);
    if (differenceInTime > MAX_HOURS_TO_SHOW) {
        const days = Math.floor(differenceInTime / (HOURS_TO_DAY * MINUTES_TO_HOUR * SECONDS_TO_MINUTES));
        let remaining = differenceInTime % (HOURS_TO_DAY * MINUTES_TO_HOUR * SECONDS_TO_MINUTES);
        const hours = Math.floor(remaining / (MINUTES_TO_HOUR * SECONDS_TO_MINUTES));
        remaining = remaining % (MINUTES_TO_HOUR * SECONDS_TO_MINUTES);
        return {
            days,
            hours,
            minutes: Math.floor(remaining / SECONDS_TO_MINUTES),
            seconds: remaining % SECONDS_TO_MINUTES,
        };
    } else if (differenceInTime > MAX_MINUTES_TO_SHOW) {
        const hours = Math.floor(differenceInTime / (SECONDS_TO_MINUTES * MINUTES_TO_HOUR));
        const remaining = differenceInTime % (SECONDS_TO_MINUTES * MINUTES_TO_HOUR);
        return {
            hours,
            minutes: Math.floor(remaining / SECONDS_TO_MINUTES),
            seconds: remaining % SECONDS_TO_MINUTES,
        };
    } else if (differenceInTime > MAX_SECONDS_TO_SHOW) {
        return {
            minutes: Math.floor(differenceInTime / SECONDS_TO_MINUTES),
            seconds: differenceInTime % SECONDS_TO_MINUTES,
        }
    }
    return {
        seconds: differenceInTime,
    };
};

type EventFields = EventTarget & {
    eventName: HTMLInputElement;
    eventDate: HTMLInputElement;
    eventTime: HTMLInputElement;
}

type DisplayBannerProps = {
    error?: string;
    name: string;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};

const DisplayBanner = ({
    error,
    name,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
}: DisplayBannerProps) => {
    if (error) {
        return (
            <div className="errorBanner">
                ! {error}
            </div>
        );
    }
    if (!name && !seconds) {
        return <></>;
    }

    let dayText = ''
    if (days === 1) {
        dayText = `${days} day`;
    } else if (days > 1) {
        dayText = `${days} days`;
    }

    let hourText = '';
    if (hours === 1) {
        hourText = `${hours} hour`;
    } else if (hours > 1) {
        hourText = `${hours} hours`;
    }

    let minuteText = '';
    if (minutes === 1) {
        minuteText = `${minutes} minute`;
    } else if (minutes > 1) {
        minuteText = `${minutes} minutes`;
    }

    let secondText = '';
    if (seconds === 1) {
        secondText = `${seconds} second`;
    } else if (seconds > 1) {
        secondText = `${seconds} seconds`;
    }

    return (
        <div className="banner">
            {name} will happen in {[dayText, hourText, minuteText, secondText].filter(text => text).join(', ')}
        </div>
    )
};

const CountdownTimer = () => {
    const [error, setError] = useState('');
    const nameRef = useRef('');
    const dateTimeRef = useRef('');
    const [decrementing, setDecrementing] = useState(false);
    const [difference, setDifference] = useState<ReturnType<typeof getDifference> | null>(null);
    useInterval(() => {
        if (decrementing) {
            setDifference(getDifference(dateTimeRef.current));
        }
    }, 1);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (decrementing) {
            setDecrementing(false);
            return false;
        }
        
        const elements = e.target as EventFields;
        let newError = '';
        const eventName = elements.eventName.value;
        nameRef.current = eventName;
        newError = validateName(eventName);
        if (newError) {
            setError(newError);
            return false;
        }
        const eventDate = elements.eventDate.value;
        const eventTime = elements.eventTime.value;
        dateTimeRef.current = (eventDate + " " + eventTime).trim();
        newError = validateDate(dateTimeRef.current);
        if (newError) {
            setError(newError);
            return false;
        }
        setDecrementing(true);
        setError('');
        return false;
    }

    return (
        <>
            <DisplayBanner
                error={error}
                name={nameRef.current}
                days={difference?.days}
                hours={difference?.hours}
                minutes={difference?.minutes}
                seconds={difference?.seconds}
            />
            <form className="formGrid" onSubmit={onSubmit}>
                <label htmlFor="eventName">
                    Event Name:&nbsp;
                </label>
                <input name="eventName" type="text" />
                <label htmlFor="eventDate">
                    Event Date:&nbsp;
                </label>
                <input name="eventDate" type="text" />
                <label htmlFor="eventTime">
                    Event Time:&nbsp;
                </label>
                <input name="eventTime" type="text" />
                <button type="submit">
                    {decrementing ? 'Stop' : 'Start'}
                </button>
            </form>
        </>
    );
};

export default CountdownTimer