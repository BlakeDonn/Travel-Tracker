import './css/base.scss';
import travelFetch from './requests/apis';
import Trip from './classes/trip';
import domUpdates from './domUpdates';
import time from './scripts/time';
import Traveler from './classes/traveler';
let currentUser; 

const logIn = () => {
  // document.getElementById('login-input').addEventListener('click', function() {
  //   let userPass = document.querySelectorAll('.login-data')
  //   let username = userPass[0].value
  //   let password = userPass[1].value
    evaluateLogin('traveler25' , 'travel2020')
  }
const evaluateLogin = (username, password) => {
  if (password === "travel2020") {
    travelFetch.dashboardInfo(+username.split('r')[2], 1) 
      .then(response => response.status === 200 ? response.json() : alert('Invalid Username'))
      .then(value=> startUp(value))
      .then(() => domUpdates.toggleHidden())
  } else {
    alert('Invalid Password')
  }
}
const startUp = (user) => {
  dashboardFetch(user)
    .then(values => currentUser = new Traveler(values))
    .then(value => formatTrips(value))
    .then(() => domUpdates.populateDestinations(currentUser.destinatio))
}
const dashboardFetch = (user) =>{
  return travelFetch.dashboardInfo(user.id)
    .then(promises => Promise.all(promises.map(response => response.json())))  
    .then(values => [values[0], values[1].trips.filter(x => x.userID === values[0].id), values[2].destinations])
}
const formatTrips = (user) =>{
  currentUser.formatTrips(user)
  currentUser.addCostToUserTrips()
}
const createTrips = (userTrips, destiTrips) => {
  let allTrips = generateTrip(userTrips, destiTrips)
  domUpdates.populateCards(allTrips.sort((a, b)=> a.time - b.time), "aside-trip-list", "beforeend")
  determineYears(allTrips)
}
const generateTrip = (userTrips, destiTrips, opt) => {
  return userTrips.reduce((acc, cur)=>{
    let foundDesti = opt ?  destiTrips : destiTrips.find(x => x.id === cur.destinationID)
    let lodgingCost = cur.duration * foundDesti.estimatedLodgingCostPerDay
    let flightCost = cur.travelers * foundDesti.estimatedFlightCostPerPerson
    let price = lodgingCost + flightCost
    !opt ? acc.push(new Trip(cur, price, foundDesti)) : acc.push(price)
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
  document.getElementById("destination-selector").addEventListener('input', calculateData)
}
const calculateData = () =>{
  if (domUpdates.checkData()) {
    calculatePriceOfTrip(domUpdates.checkData())
  }
}
const calculatePriceOfTrip = (combinedInputs) => {
  let destinationId = combinedInputs[3].split(' ').reverse()[0]
  let destination;
  travelFetch.destinationInfo()
    .then(response => destination = response.destinations.find(x => x.id == destinationId))
    .then(()=> generateTrip(tripInfo, destination, 1))
    .then(value => domUpdates.displayEstimatePrice(value))
    .then(value => setUpPost(combinedInputs, duration, value, destination))
  let start =  time.getDate(combinedInputs[0].split('-'));
  let end = time.getDate(combinedInputs[1].split('-'));
  let duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  let tripInfo = [{duration: duration, travelers: +combinedInputs[2]}]
}
const setUpPost = (combinedInputs, duration, value, destination) =>{
  document.getElementById('destination-submit').addEventListener('click', function() {
    let postInfo = {
      id: 6, 
      userID: 8, 
      destinationID: +destination.id, 
      travelers: +combinedInputs[2], 
      date: combinedInputs[0].replace(/-/g, '/'), 
      duration: duration, 
      status: 'pending', 
      suggestedActivities: []
    }
    postTrip(postInfo, value, destination)
  })
}
const postTrip = (postInfo, price, destination) =>{
  travelFetch.tripInfo()
    .then(response => response.json())
    .then(value => postInfo.id = value.trips.length + 1)
    .then(() => travelFetch.addTrip(postInfo))
    .then(response => response.json())
    .then(value => value.message.includes('successful') 
      ? new Trip(value.newResource, price, destination) : alert(`Error${value.message}`))
    .then(value => domUpdates.populateCards([value], 'pending-trips', 'afterbegin'))
}
logIn()

  