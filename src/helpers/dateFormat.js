export const timeFormat = (date) => {
    return new Intl.DateTimeFormat('en', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date(date));
};

export const dateFormat = (date, country) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // get timezone eg. Asia/Jakarta
    return new Intl.DateTimeFormat(country, {
        hour12: false,
        year: '2-digit',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short',
        timeZone: timezone,
    }).format(new Date(date));
};

export const shortDayMonth = (date) => {
    const dt = new Date(date);
    const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(dt);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(dt);
    return `${day} ${month}`;
};
