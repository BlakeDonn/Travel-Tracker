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
    return this.trips.reduce((acc, cur)=>{
      let formattedTrip = new Trip(cur)
      acc.push(formattedTrip)
      return acc
    }, [])
  }
}
export default Traveler