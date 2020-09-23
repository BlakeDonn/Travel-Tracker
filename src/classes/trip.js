import time from '../scripts/time';

class Trip {
  constructor(tripInfo, price, destination) {
    this.date = tripInfo.date;
    this.userId = tripInfo.id;
    this.duration = tripInfo.duration;
    this.destination = tripInfo.destinationID;
  }
  // determineTripCost(userTrips, destiTrips, opt) {
  //   this.price = userTrips.reduce((acc, cur )=>{
  //     let foundDesti = opt ?  destiTrips : destiTrips.find(x => x.id === cur.destinationID)
  //     let lodgingCost = cur.duration * foundDesti.estimatedLodgingCostPerDay
  //     let flightCost = cur.travelers * foundDesti.estimatedFlightCostPerPerson
  //     let price = lodgingCost + flightCost
  //     !opt ? : acc.push(price)
  //     return acc
  //   }, [])
  //   })
  determineTripStatus() {
    this.status = time.isBetween(tripInfo.status, this.date, this.duration);
  }
  attachDestination() {
    this.destination = {
      location: destination.destination, image: destination.image, alt: destination.alt
    }
  }
  attachDurationTime() {
    time.daysFromDate(this.date, tripInfo.duration)
  }
  getDate () {
    this.date.getTime();
  }
  calculateDate() {
    // time.getDate(tripInfo.date.split('/');
  }
}

export default Trip