import './css/base.scss';
import travelFetch from './requests/apis';
import Trip from './classes/trip';
import domUpdates from './domUpdates';

const startUp = () => {
  let userTrips, destiTrips, destiNames;
  dashboardFetch()
    .then(values => (userTrips = values, destinationFetch(values)))
    .then(values => (destiTrips = values[1], destiNames = values[0]))
    .then(() => userTrips.sort((a, b) => a.destinationID - b.destinationID))
    .then(() => createTrips(userTrips, destiTrips))
    .then(() => domUpdates.populateDestinations(destiNames))
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
  let allTrips = generateTrip(userTrips, destiTrips)
  domUpdates.populateCards(allTrips.sort((a, b)=> a.time - b.time))
  determineYears(allTrips)
}
const generateTrip = (userTrips, destiTrips) => {
  console.log(userTrips, destiTrips)
  return userTrips.reduce((acc, cur, i)=>{
    let lodgingCost = cur.duration * destiTrips[i].estimatedLodgingCostPerDay
    let flightCost = cur.travelers * destiTrips[i].estimatedFlightCostPerPerson
    let price = lodgingCost + flightCost
    acc.push(new Trip(cur, price, destiTrips[i]))
    return acc
  }, [])
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
  document.getElementById("destination-selector").addEventListener('input', checkData)
}
const checkData = () =>{
  let startDate = document.getElementById('start-date-input').value
  let returnDate = document.getElementById('return-date-input').value
  let travelerInput = document.getElementById('traveler-input').value
  let destinationChoice = document.getElementById('destination-selector').value
  if (startDate && returnDate && travelerInput && travelerInput && destinationChoice) {
    let combinedInputs = [startDate, returnDate, travelerInput, destinationChoice]
    calculatePriceOfTrip(combinedInputs)
  }
  document.getElementById("destination-submit").addEventListener('click', postData)
}
const postData = () =>{
  
}
const calculatePriceOfTrip = (combinedInputs) => {
  let start =  time.getDate(tripInfo.date.split('/'));
  let end = time.getDate(tripInfo.date.split('/'));
  
  let thisDate = new Date(date.getTime() - millisecondsFromThen)
  travelFetch.destinationInfo()
  .then(response =>response.destinations.find(x => x.destination.split(',' )[0] === combinedInputs[3].split(',')[0]))
  .then(value => generateTrip(combinedInputs, value))
}
startUp()

  