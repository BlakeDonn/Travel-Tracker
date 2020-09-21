import time from './scripts/time';

class Trip {
  constructor(tripInfo) {
    this.tripLocation = tripInfo.destinyID;
    this.tripStatus = time.isBetween(tripInfo.status, tripInfo.date.split('/'), (tripInfo.date + tripInfo.duration).split('/'))
    this.year = tripInfo.date.split('/')[0]
  }
}
export default Trip