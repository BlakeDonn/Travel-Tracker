import time from '../scripts/time';

class Trip {
  constructor(tripInfo) {
    this.id = tripInfo.id;
    this.userID = tripInfo.userID;
    this.destinationID = tripInfo.destinationID;
    this.travelers = tripInfo.travelers;
    this.date = tripInfo.date;
    this.duration = tripInfo.duration;
    this.status = tripInfo.status || 'pending';
    this.suggestedActivities = [];
  }
  determineTripStatus() {
    return time.isBetween(this.status, this.startDate, this.endDate)
  }
  setTime() {
    return time.getDate(this.date.split('/')).getTime()
  }
  setDuration() {
    let date = time.getDate(this.date.split('/'))
    let duration = time.daysFromDate(date, this.duration)
    return [date, duration]
  }
}
export default Trip