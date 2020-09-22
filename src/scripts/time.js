let time = {
  getDate(date) {
    return new Date(date[0], date[1] - 1, date[2])
  },
  daysFromDate(date, days) {
    let millisecondsFromThen = days * 24 * 60 * 60 * 1000;
    let thisDate = new Date(date.getTime() + millisecondsFromThen)
    return thisDate
  },
  isBetween(status, testDate, endDate) {
    if (status === 'pending') {
      return 'pending'
    }
    let currentDate = new Date()
    if (currentDate.getTime() >= testDate.getTime() && currentDate.getTime() <= endDate.getTime()) {
      return 'present'
    }
    if (testDate.getTime()  < currentDate.getTime()) {
      return 'past'
    }
    if (testDate.getTime()  > currentDate.getTime()) {
      return 'upcoming'
    }
  }
}
export default time