/**
 * mengubah format tanggal dan jam ke lokal indonesia
 * @param date 
 * @return {date} DD MMMM YYYY
 */
const monthFormat = date => {
    const monthNames = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June',
        'July', 
        'Agugust', 
        'September', 
        'October', 
        'November', 
        'December'
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * 
 * @param {date} date 
 * @return {hh:mm}
 */
const clockFormat = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    let hourMinute = `${hours}:${minutes}`;
    return hourMinute;
}

/**
 * 
 * @param {date} date 
 * @return {date} DD MMMM YYYY hh:mm WIB
 */
const utcToWib = date => {
    return `${monthFormat(date)} ${clockFormat(date)} WIB`;
}

/**
 * 
 * @param {date} date 
 * @param {int} diff (optional days different -> 3 or -3)
 * @return {date} YYYY-MM-DD
 */
const customDate = (date, diff = 0) => {
    date.setDate(date.getDate() + diff);
    let YEAR = date.getFullYear();
    let MONTH = ('0' + (date.getMonth() + 1)).slice(-2);
    let DATE = ('0' + date.getDate()).slice(-2);
    let matchDateNow = `${YEAR}-${MONTH}-${DATE}`;
    return matchDateNow;
} 
export {monthFormat, clockFormat, utcToWib, customDate};