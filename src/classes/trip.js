import time from '../scripts/time';

class Trip {
  constructor(tripInfo, price, destination) {
    this.tripStatus = time.isBetween(tripInfo.status, tripInfo.date.split('/'), time.daysFromDate(tripInfo.date.split('/'), tripInfo.duration));
    this.year = tripInfo.date.split('/')[0];
    this.price = price;
    this.destination = {location: destination.destination, image: destination.image, alt: destination.alt}
  }
}
export default Trip