
class Traveler {
  constructor(userInfo) {
    this.userInfo = 
    typeof(userInfo.id) === 'number'
      ?  typeof(userInfo.name) === 'string' && userInfo.name.split(' ').length === 2
        ?  typeof(userInfo.travelerType) === 'string' && 'relaxer, thrill-seeker, history buff, foodie, photographer'.includes(userInfo.travelerType)
          ? userInfo : null : null : null;
  }
}
export default Traveler