import './css/base.scss';
import travelFetch from './requests/apis';
import Trip from './classes/trip';
import domUpdates from './domUpdates';

const startUp = () => {
  let userTrips, destiTrips;
  dashboardFetch()
    .then(values => (userTrips = values, destinationFetch(values)))
    .then(values => destiTrips = values[1])
    .then(() => userTrips.sort((a, b) => a.destinationID - b.destinationID))
    .then(() => createTrips(userTrips, destiTrips))
}
const dashboardFetch = () =>{
  return travelFetch.dashboardInfo(8)
    .then(promises => Promise.all(promises.map(response => response.json())))  
    .then(values => values[1].trips.filter(x => x.userID === values[0].id))
}
const destinationFetch = (values) => {
  let destiNames, destiTrips, destinationData;
  let valueIds = values.map(x => x.destinationID)
 return travelFetch.destinationInfo()
 .then(response => destinationData = response)
 .then(() => destiNames = destinationData.destinations.map(x => x.destination))
 .then(() => destiTrips = destinationData.destinations.filter(x => valueIds.includes(x.id)))
 .then(() => [destiNames, destiTrips])
}
const createTrips = (userTrips, destiTrips) => {
  console.log(destiTrips)
  let allTrips = userTrips.reduce((acc, cur, i)=>{
    let lodgingCost = cur.duration * destiTrips[i].estimatedLodgingCostPerDay
    let flightCost = cur.travelers * destiTrips[i].estimatedFlightCostPerPerson
    let price = lodgingCost + flightCost
    acc.push(new Trip(cur, price, destiTrips[i]))
    return acc
  }, [])
  domUpdates.populateCards(allTrips.sort((a, b)=> a.time - b.time))
  determineYears(allTrips)
}
const determineYears = (allTrips) =>  {
  let currentYear = new Date().toString().split(' ',  4)[3]
  let yearMatches = allTrips.filter(trip =>{
    return currentYear === trip.date.toString().split(' ',  4)[3] 
    || currentYear === trip.duration.toString().split(' ',  4)[3]
  })
  yearMatches ? calculateYearPrice(yearMatches) : domUpdates.addPlaceholder();
}
const calculateYearPrice = (trips) => {
  let total = trips.reduce((yearPrice, trip)=>{
    return   yearPrice += trip.price
  }, 0)
  total = total + ((10 / 100) * total)
  domUpdates.populateYearPrice({tripAmount: trips.length, totalPrice: total.toFixed(2)})
}
startUp()

  