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
  addDestinationToUserTrips() {
    this.trips.forEach(trip =>{
      let destinationInfo = this.possibleDestinations.filter(desti => desti.id === trip.destination)
      let lodging = trip.duration * destinationInfo[0].estimatedLodgingCostPerDay 
      let flight = destinationInfo[0].estimatedFlightCostPerPerson * trip.travelers
      trip.price = lodging + flight
      trip.destinationName = destinationInfo[0].destination
    })
  }
  setTripTimes() {
    this.trips.forEach(trip =>{
      
    })
  }
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
export default Traveler