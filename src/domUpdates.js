let domUpdates = {
  populateCards(trips, domLocation, inputLocation) {
    trips.forEach(trip =>{
      let className;

      trip.status === 'pending' 
        ? (domLocation = 'pending-trips', inputLocation = 'beforeend', className = "pending-cards card") 
        : (domLocation = 'aside-trip-list', inputLocation = "afterbegin", className = "card")
      let catalyst = document.getElementById(domLocation)
      catalyst.insertAdjacentHTML(inputLocation,
        `<div id = "${trip.destinationID}" role="tabpanel"  tabindex="0" class = "${className}">
            <h4 id = "date-label"> When:</h4>
            <div id ="date" class = ""> ${trip.displayableDates}</div>
            <h4 id = "location-label"> Where:</h4>
            <div id ="class = class=""destination">${trip.destinationName}</div>
            <h4 id = "location-label"> Staus:</h4>
            <div id ="class = class=""destination">${trip.status}</div>
        `)
    })
  },
  populateYearPrice(obj) {
    let footerElement = document.querySelector('.main-cards')
    footerElement.insertAdjacentHTML("beforeend", 
      `<div id="total-trips" role="tabpanel" tabindex="0">
        <section id = "yearly-cost-summary" class = "card">    
        <h3 id ="yearly-number-of-trips">You went on ${obj.tripAmount} trips this year!</h3>
        <h4 id ="yearly-total-price">Total cost for all trips: $${obj.totalPrice}</h4>
        </section>
        </div>
    `)
  },
  populateDestinations(destinations) {
    let destinationDropdown = document.getElementById('destination-dropdown')
    let sorted = destinations.sort()
    let listItems = sorted.reduce((allDest, dest)=>{
      return allDest += `<option id = "${dest.destination, dest.id}" value = "${dest.destination} ${dest.id}" $></br>`
    },'')
    destinationDropdown.insertAdjacentHTML('afterbegin', listItems)
  },
 checkData() {
   let combinedInputs;
    let startDate = document.getElementById('start-date-input').value
    let returnDate = document.getElementById('return-date-input').value
    let travelerInput = document.getElementById('traveler-input').value
    let destinationChoice = document.getElementById('destination-selector').value
    if (startDate && returnDate && travelerInput && travelerInput && destinationChoice) {
      return combinedInputs = [startDate, returnDate, travelerInput, destinationChoice]
    }
  },
  displayEstimatePrice(price) {
    let total = +price + ((10 / 100) * +price)
    let target1 = document.getElementById('trip-title')
    target1.insertAdjacentHTML("beforeend", 
      `<h4 id ="yearly-number-of-trips">Your estimated cost: ${total.toFixed(2)} (agency fee included)</h4>`
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