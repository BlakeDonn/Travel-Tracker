import time from '../scripts/time';

class Trip {
  constructor(tripInfo, price, destination) {
    this.year = tripInfo.date.split('/')[0];
    this.price = price;
    this.date = time.getDate(tripInfo.date.split('/'));
    this.time = this.date.getTime()
    this.duration = time.daysFromDate(tripInfo.date.split('/'), tripInfo.duration);
    this.tripStatus = time.isBetween(tripInfo.status, this.date , this.duration);
    this.destination = {location: destination.destination, image: destination.image, alt: destination.alt}
  }
}
export default Trip