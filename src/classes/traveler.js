
class Traveler {
  constructor(userInfo, trips) {
    this.userInfo = 
    typeof(userInfo.id) === 'number'
      ?  typeof(userInfo.name) === 'string' 
        ?  typeof(userInfo.travelerType) === 'string' 
          ? userInfo : null : null : null;
    this.trips = trips;
  }
}
export default Traveler