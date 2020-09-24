import './css/base.scss';
import travelFetch from './requests/apis';
import Trip from './classes/trip';
import domUpdates from './domUpdates';
import time from './scripts/time';
import Traveler from './classes/traveler';
let currentUser; 

const logIn = () => {
  document.getElementById('login-input').addEventListener('click', function() {
    let userPass = document.querySelectorAll('.login-data')
    let username = userPass[0].value
    let password = userPass[1].value
    evaluateLogin(username , password)
  })
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
    .then(() => domUpdates.populateDestinations(currentUser.possibleDestinations))
}
const dashboardFetch = (user) =>{
  return travelFetch.dashboardInfo(user.id)
    .then(promises => Promise.all(promises.map(response => response.json())))  
    .then(values => [values[0], values[1].trips.filter(x => x.userID === values[0].id), values[2].destinations])
}
const formatTrips = (user) =>{
  currentUser.formatTrips(user)
  currentUser.addDestinationToUserTrips()
  currentUser.sortTrips()
  currentUser.setTripDuration()
  currentUser.specifyTripStatus()
  createTrips()
}
const createTrips = () => {
  domUpdates.populateCards(currentUser.trips, "aside-trip-list", "beforeend")
  calculateYearPrice()
  calculateData()
}
const calculateYearPrice = () => {
  let total = currentUser.trips.reduce((yearPrice, trip)=>{
    return   yearPrice += trip.price
  }, 0)
  total = total + ((10 / 100) * total)
  domUpdates.populateYearPrice({tripAmount: currentUser.trips.length, totalPrice: total.toFixed(2)})
  document.getElementById("destination-selector").addEventListener('input', calculateData)
}
const calculateData = () =>{
  if (domUpdates.checkData()) {
    calculatePriceOfTrip(domUpdates.checkData())
  }
}
const calculatePriceOfTrip = (combinedInputs) => {
  let userInputs = consolodateUserInput(combinedInputs)
  let selectedDestination = currentUser.possibleDestinations.find(destination => destination.id == userInputs.id)
  let lodging = userInputs.duration * selectedDestination.estimatedLodgingCostPerDay 
  let flight = selectedDestination.estimatedFlightCostPerPerson * userInputs.travelers
  domUpdates.displayEstimatePrice(lodging + flight)
  setUpPost(userInputs)
}
const consolodateUserInput = (combinedInputs) =>{
  let inputId = combinedInputs[3].split(' ').reverse()[0]
  let start =  time.getDate(combinedInputs[0].split('-'));
  let end = time.getDate(combinedInputs[1].split('-'));
  let duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  return {
    id: inputId, 
    userID: currentUser.userInfo.id,
    destinationID: +inputId, 
    duration: duration, 
    travelers: +combinedInputs[2], 
    date: combinedInputs[0].replace(/-/g, '/'),   
  }
}
const setUpPost = (tripToPost) =>{
  document.getElementById('destination-submit').addEventListener('click', function() {
    let formattedPost = new Trip(tripToPost)
    postTrip(formattedPost)
  })
}
const postTrip = (postInfo) =>{
  console.log(postInfo)
  travelFetch.tripInfo()
    .then(response => response.json())
    .then(value => postInfo.id = +value.trips.length + 1)
    .then(() => travelFetch.addTrip(postInfo))
    .then(response => response.json())
    .then(value => value.message.includes('successful') 
      ? newDisplay(value) : alert(`Error${value.message}`))
}
const newDisplay = (value) =>{
  let newTrip = new Trip(value.newResource)
  newTrip.destinationName = currentUser.addDestinationToUserTrips([newTrip])
  newTrip.displayableDates = currentUser.setTripDuration([newTrip])
  domUpdates.populateCards([newTrip], 'pending-trips', 'afterbegin') 
}
logIn()

  