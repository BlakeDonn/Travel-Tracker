let time = {
  daysFromDate(date, days) {
    date = new Date(date[0], date[1], date[2])
    let millisecondsFromThen = days * 24 * 60 * 60 * 1000;
    return new Date(date.getTime() + millisecondsFromThen)
  },
  isBetween(status, test, end) {
    if (status === 'pending') {
      return 'pending'
    }
    let currentDate = new Date()
    let testDate = new Date(test[0], test[1] - 1, test[2])
    let endDate = new Date(end[0], end[1] - 1, end[2])
    if (currentDate.getTime() >= testDate.getTime() && currentDate.getTime() <= endDate.getTime()) {
      return 'present'
    }
    if (testDate.getTime()  < currentDate.getTime()) {
      return 'past'
    }
    if (testDate.getTime()  > currentDate.getTime()) {
      return 'future'
    }
  }
}
export default time