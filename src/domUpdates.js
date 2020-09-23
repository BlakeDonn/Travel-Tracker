let domUpdates = {
  populateCards(trips, domLocation, inputLocation) {
    trips.forEach(trip =>{
      let className;
      trip.tripStatus === 'pending' 
        ? (domLocation = 'pending-trips', inputLocation = 'beforeend', className = "pending-cards card") 
        : (domLocation = 'aside-trip-list', inputLocation = "afterbegin", className = "card")
      let catalyst = document.getElementById(domLocation)
      let date = trip.date.toString().split('00')[0]
      let duration = trip.duration.toString().split('00')[0]
      catalyst.insertAdjacentHTML(inputLocation,
        `<div id = "${trip.destination.location}" role="tabpanel"  tabindex="0" class = "${className}">
            <h4 id = "date-label"> When:</h4>
            <div id ="date" class = ""> ${date} - ${duration}</div>
            <h4 id = "location-label"> Where:</h4>
            <div id ="class = class=""destination">${trip.destination.location}</div>
        `)
    })
  },
  populateYearPrice(obj) {
    let footerElement = document.querySelector('.main-cards')
    footerElement.insertAdjacentHTML("beforeend", 
      `<div id="total-trips" role="tabpanel" tabindex="0">
        <section id = "yearly-cost-summary" class = "card">    
        <h2 id ="yearly-number-of-trips">You went on ${obj.tripAmount} trips this year!</h2>
        <h2 id ="yearly-total-price">Total cost for all trips: $${obj.totalPrice}</h2>
        </section>
        </div>
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
  }
}

export default domUpdates;