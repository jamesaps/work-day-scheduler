var currentDayElement = $('#currentDay');

displayCurrentDay();

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

function createTimeblock(time) {
    var row = $('<div class="row">');
    var hourElement = $('<div class="col-1 hour text-end pt-3">');
    var textAreaElement = $('<textarea class="col">');
    var saveButtonElement = $('<div class="col-1 saveBtn d-flex align-items-center justify-content-center">');
    var saveButtonIconElement = $('<i class="fas fa-save">');

    row.append(hourElement);
    row.append(textAreaElement);

    saveButtonElement.append(saveButtonIconElement);
    row.append(saveButtonElement);

    $('.container').append(row);
}