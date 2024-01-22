var currentDayElement = $('#currentDay');

var startOfWorkDay = dayjs('2000-01-01 09:00');
var endOfWorkDay = dayjs('2000-01-01 22:00');

var schedule = {};

loadSchedule();

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
    // create timeblock elements
    var row = $('<div class="row">');
    var hourElement = $('<div class="col-1 hour text-end pt-3">');
    var textAreaElement = $('<textarea class="col">');
    var saveButtonElement = $('<div class="col-1 saveBtn d-flex align-items-center justify-content-center">');
    var saveButtonIconElement = $('<i class="fas fa-save">');

    // populate hour element and append to row
    var timeFormattedAsString = getHourAndDayPeriodFromTime(time);
    hourElement.text(timeFormattedAsString);
    row.append(hourElement);

    // determine color of time block according to time in schedule relative to current time
    var tenseOfTimeblock = getTenseOfDateByHour(time);
    textAreaElement.addClass(tenseOfTimeblock);

    // populate text area contents with pre-existing value from scheudle if it exists
    if (schedule[time.hour()] !== undefined) {
        textAreaElement.val(schedule[time.hour()]);
    }

    row.append(textAreaElement);

    // add event listener to the save (functional) button element to perform save action on click
    saveButtonElement.on('click', function () {
        saveTimeblock(time.hour(), textAreaElement);
    });

    saveButtonElement.append(saveButtonIconElement);
    row.append(saveButtonElement);

    // append time block row to the container
    $('.container').append(row);
}

function getHourAndDayPeriodFromTime(time) {
    // time is a dayjs() object

    return time.format('hA');
}

function getTenseOfDateByHour(time) {
    var hourToTest = time.hour();
    var currentHour = dayjs().hour();

    if (hourToTest < currentHour) {
        return 'past';
    }

    if (hourToTest === currentHour) {
        return 'present';
    }

    if (hourToTest > currentHour) {
        return 'future';
    }
}

function saveTimeblock(hour, textAreaElement) {
    var textToSave = textAreaElement.val();
    schedule[hour] = textToSave;

    persistScheduleToLocalStorage();
}

function persistScheduleToLocalStorage() {
    // covert schedule object to string for storage in localStorage
    var scheduleEncodedAsString = JSON.stringify(schedule);

    localStorage.setItem('schedule', scheduleEncodedAsString);
}

function loadSchedule() {
    var scheduleFromLocalStorage = localStorage.getItem('schedule');

    // if schedule does not exist in user's local storage, terminate loading
    if (scheduleFromLocalStorage === null) {
        return;
    }

    schedule = JSON.parse(scheduleFromLocalStorage);
}