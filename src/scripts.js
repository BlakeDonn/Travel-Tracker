import './css/base.scss';
import travelFetch from './requests/apis';
import time from './scripts/time';
import './images/turing-logo.png'
import Trip from './classes/trip';

const startUp = () => {
  let userTrips, destiTrips;
  dashboardFetch()
    .then(values => (userTrips = values, destinationFetch(values)))
    .then(values => destiTrips = values)
    .then(() => userTrips.sort((a, b) => a.destinationID - b.destinationID))
    .then(() => createTrips(userTrips, destiTrips))
    .then((value) => console.log(value))
}
const dashboardFetch = () =>{
  return travelFetch.dashboardInfo(30)
    .then(promises => Promise.all(promises.map(response => response.json())))  
    .then(values => values[1].trips.filter(x => x.userID === values[0].id))
}
const destinationFetch = (values) => {
  return travelFetch.destinationInfo(values.map(x => x.destinationID))
}
const createTrips = (userTrips, destiTrips) => {
  return userTrips.reduce((acc, cur, i)=>{
    let lodgingCost = cur.duration * destiTrips[i].estimatedLodgingCostPerDay
    let flightCost = cur.travelers * destiTrips[i].estimatedFlightCostPerPerson
    let price = lodgingCost + flightCost
    acc.push(new Trip(cur, price, destiTrips[i]))
    return acc
  }, [])
}
startUp()

  