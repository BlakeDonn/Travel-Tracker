
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
  createTrips(userTrips, destiTrips)
}
const dashboardFetch = () =>{
  return travelFetch.dashboardInfo(5)
    .then(promises => Promise.all(promises.map(response => response.json())))  
    .then(values => values[1].trips.filter(x => x.userID === values[0].id))
}
const destinationFetch = (values) => {
  return travelFetch.destinationInfo(values.map(x => x.destinationID))
}

startUp()

  