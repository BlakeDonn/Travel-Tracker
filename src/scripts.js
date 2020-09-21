
import './css/base.scss';
import travelFetch from './requests/apis';
import time from './scripts/time';
import './images/turing-logo.png'

let startUp = () => {
  let userTrips;
  let destiCost;
  travelFetch.dashboardInfo(5)
    .then(promises => Promise.all(promises.map(response => response.json())))  
    .then(values => userTrips = values[1].trips.filter(x => x.userID === values[0].id))
    .then(values => travelFetch.destinationInfo(userTrips.map(x => x.destinationID)))
    .then(values => console.log(values))
    .then(value => console.log(userTrips))
}

startUp()

  