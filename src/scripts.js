import './css/base.scss';
import travelFetch from './requests/apis';
import Trip from './classes/trip';
import domUpdates from './domUpdates';

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
  let allTrips = userTrips.reduce((acc, cur, i)=>{
    let lodgingCost = cur.duration * destiTrips[i].estimatedLodgingCostPerDay
    let flightCost = cur.travelers * destiTrips[i].estimatedFlightCostPerPerson
    let price = lodgingCost + flightCost
    acc.push(new Trip(cur, price, destiTrips[i]))
    return acc
  }, [])
  domUpdates.populateCards(allTrips.sort((a , b)=> b.time - a.time))
  determineYears(allTrips)
}
const determineYears = (allTrips) =>  {
  let currentYear = new Date().toString().split(' ',  4)[3]
  let yearMatches = allTrips.filter(trip =>{
    return currentYear === trip.date.toString().split(' ',  4)[3] 
    || currentYear === trip.duration.toString().split(' ',  4)[3]
  })
  yearMatches.length ? domUpdates.populateYearPrice(yearMatches) : domUpdates.addPlaceholder();
}
startUp()

  