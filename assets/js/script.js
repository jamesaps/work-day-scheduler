var currentDayElement = $('#currentDay');

var startOfWorkDay = dayjs('2000-01-01 09:00');
var endOfWorkDay = dayjs('2000-01-01 17:00');

displayCurrentDay();
generateTimeblocks(startOfWorkDay, endOfWorkDay);

function displayCurrentDay() {
    currentDayElement.text(getCurrentDayString());
}

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

function generateTimeblocks(fromTime, toTime) {
    // default to hours 00:00 to 23:00 when times not provided
    if (fromTime === undefined) {
        fromTime = dayjs('2000-01-01 00:00');
    }

    if (toTime === undefined) {
        toTime = dayjs('2000-01-01 23:00');
    }

    // swap the times if the from time is greater than the to time
    if (fromTime.hour() > toTime.hour()) {
        var temp = fromTime;

        fromTime = toTime;
        toTime = temp;
    }

    for (var currentTime = fromTime; currentTime.hour() <= toTime.hour() && currentTime.date() === fromTime.date(); currentTime = currentTime.add(1, 'hour')) {
        createTimeblock(currentTime);
    }
}

function createTimeblock(time) {
    var row = $('<div class="row">');
    var hourElement = $('<div class="col-1 hour text-end pt-3">');
    var textAreaElement = $('<textarea class="col">');
    var saveButtonElement = $('<div class="col-1 saveBtn d-flex align-items-center justify-content-center">');
    var saveButtonIconElement = $('<i class="fas fa-save">');

    var timeFormattedAsString = getHourAndDayPeriodFromTime(time);
    hourElement.text(timeFormattedAsString);

    row.append(hourElement);
    row.append(textAreaElement);

    saveButtonElement.append(saveButtonIconElement);
    row.append(saveButtonElement);

    $('.container').append(row);
}

function getHourAndDayPeriodFromTime(time) {
    // time is a dayjs() object

    return time.format('hA');
}