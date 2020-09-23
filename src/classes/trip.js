import time from '../scripts/time';

class Trip {
  constructor(tripInfo, price, destination) {
    this.id = tripInfo.id;
    this.userId = tripInfo.userID;
    this.destination = tripInfo.destinationID;
    this.travelers = tripInfo.travelers;
    this.date = tripInfo.date;
    this.duration = tripInfo.duration;
    this.status = tripInfo.status || 'pending';
    this.suggestedActivities = [];
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
  
  getDate () {
    this.date.getTime();
  }
 setTime() {
 return time.getDate(this.date.split('/')).getTime()
 }
 setDuration() {
    let date = time.getDate(this.date)
    let duration = time.daysFromDate(date, this.duration)
    return [date, duration]
}
}
export default Trip