let domUpdates = {
  populateCards(trips, domLocation, inputLocation) {
    trips.forEach(trip =>{
      trip.tripStatus === 'pending' ? (domLocation = 'pending-trips', inputLocation = 'afterbegin') : null;
      let catalyst = document.getElementById(domLocation)
      let date = trip.date.toString().split('00')[0]
      let duration = trip.duration.toString().split('00')[0]
      catalyst.insertAdjacentHTML(inputLocation,
        `<div id = "${trip.destination.location}" class = "overviewcard">
            <div id ="date" class = "overviewcard__icon">When: ${date} - ${duration}</div>
            <div id ="class = class="overviewcard__info"destination">Where: ${trip.destination.location}</div>
        `)
    })
  },
  populateYearPrice(obj) {
    let footerElement = document.getElementById('yearly-cost-summary')
    footerElement.insertAdjacentHTML("afterbegin", 
      `<h2 id ="yearly-number-of-trips">You went on ${obj.tripAmount} trips this year!</h2>
        <h2 id ="yearly-total-price">Total cost for all trips: ${obj.totalPrice}</h2>
    `)
  },
  populateDestinations(destinations) {
    let destinationDropdown = document.getElementById('destination-dropdown')
    let sorted = destinations.sort()
    let listItems = sorted.reduce((allDest, dest)=>{
      return allDest += `<option id = "${dest[0], dest[1]}" value = "${dest[0]} ${dest[1]}" class = "${dest[0].split(',').reverse()[0]}"$></br>`
    },'')
    destinationDropdown.insertAdjacentHTML('afterbegin', listItems)
  },
  displayEstimatePrice(price) {
    let total = +price + ((10 / 100) * +price)
    let target1 = document.getElementById('trip-title')
    target1.insertAdjacentHTML("beforeend", 
      `<h3 id ="yearly-number-of-trips">Your estimated cost: ${total.toFixed(2)} (agency fee included)</h3`
    )
    return price
  },
  toggleHidden() {
    document.querySelector('.grid-container').classList.toggle('hidden')
    document.querySelector("body").classList.remove("login-background")
    document.querySelector(".login").remove()
  }
 
}

export default domUpdates;