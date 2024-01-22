function getCurrentDayString() {
    var date = dayjs(); // instantiate date object to current date/time
    var dayString = date.format('dddd, MMMM D'); // formats date in following manner: Thursday, September 5 
    var dayOfMonth = date.date(); // gets day of month from dayjs() object
    var ordinalSuffix = getOrdinalSuffix(dayOfMonth); // get appropriate suffix according to date (st, nd, rd, th)

    dayString += ordinalSuffix;

    return dayString;
}

function getOrdinalSuffix(number) {
    if (number % 10 === 1 && number % 100 != 11) {
        return 'st';
    }

    if (number % 10 === 2 && number % 100 != 12) {
        return 'nd';
    }

    if (number % 10 === 3 && number % 100 != 13) {
        return 'rd';
    }

    return 'th';
}
