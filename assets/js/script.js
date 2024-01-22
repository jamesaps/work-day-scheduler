function getCurrentDayString() {
    var date = dayjs();
    var dayString = date.format('dddd, MMMM D');

    return dayString;
}