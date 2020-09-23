import Trip from './trip';

class Traveler {
  constructor(userInfo) {
    this.userInfo = 
    typeof(userInfo[0].id) === 'number'
      ?  typeof(userInfo[0].name) === 'string' && userInfo[0].name.split(' ').length === 2
        ?  typeof(userInfo[0].travelerType) === 'string' && 'relaxer, thrill-seeker, history buff, foodie, photographer'.includes(userInfo[0].travelerType)
          ? userInfo[0] : null : null : null;
    this.trips = userInfo[1];
    this.possibleDestinations = userInfo[2];
  }
  formatTrips(trips) {
    this.trips = this.trips.reduce((acc, cur)=>{
      let formattedTrip = new Trip(cur)
      acc.push(formattedTrip)
      return acc
    }, [])
  }
  addDestinationToUserTrips(opt) {
    let selectTrip = opt ? opt : this.trips;
    let names;
    selectTrip.forEach(trip =>{
      let destinationInfo = this.possibleDestinations.filter(desti => desti.id === trip.destinationID)
      let lodging = trip.duration * destinationInfo[0].estimatedLodgingCostPerDay 
      let flight = destinationInfo[0].estimatedFlightCostPerPerson * trip.travelers
      trip.price = lodging + flight
      trip.destinationName = destinationInfo[0].destination
      names = trip.destinationName
    })
    return names
  }
  setTripTimes() {
    this.trips.forEach(trip =>{
      trip.sortTime = trip.setTime()
    })
  }
  setTripDuration(opt) {
    let selectTrip = opt ? opt : this.trips
    let displayDates;
    selectTrip.forEach(trip =>{
      let dates = trip.setDuration()
      trip.startDate = dates[0]
      trip.endDate = dates[1]
      trip.displayableDates = `${trip.startDate.toString().split('00')[0]} - ${trip.endDate.toString().split('00')[0]}`
      displayDates = trip.displayableDates
    })
    return displayDates
  }
  specifyTripStatus() { 
    this.trips.forEach(trip =>{
      trip.status = trip.determineTripStatus()
    })
  }
  determineYearTrips() {
    let currentYear = new Date().toString().split(' ',  4)[3]
    return  this.Trips.filter(trip => currentYear === trip.date().split('/ ',  1)[0])
  }
}
export default Traveler