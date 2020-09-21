import time from '../scripts/time';

class Trip {
  constructor(tripInfo, destination) {
    this.tripLocation = tripInfo.destinationID;
    this.tripStatus = time.isBetween(tripInfo.status, tripInfo.date.split('/'), time.daysFromDate(tripInfo.date.split('/'), tripInfo.duration));
    this.year = tripInfo.date.split('/')[0];
    this.price = price;
  }
}
export default Trip