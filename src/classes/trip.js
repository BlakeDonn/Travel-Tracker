import time from '../scripts/time';

class Trip {
  constructor(tripInfo, destination) {
    this.tripLocation = tripInfo.destinyID;
    this.tripStatus = time.isBetween(tripInfo.status, tripInfo.date.split('/'), time.daysFromDate(tripInfo.date.split('/'), tripInfo.duration));
    this.year = tripInfo.date.split('/')[0];
    this.destination = destination;
  }
}
export default Trip