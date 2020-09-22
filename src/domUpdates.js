import flatpickr from "flatpickr";
let domUpdates = {
  populateCards(trips) {
    let cardCatalyst = document.getElementById('asideHeader')
    trips.forEach(trip =>{
      let date = trip.date.toString().split('00')[0]
      let duration = trip.duration.toString().split('00')[0]
      cardCatalyst.insertAdjacentHTML("afterend",
        `<div id = "${trip.destination.location}" class = "card">
            <h2 id ="date">When: ${date} - ${duration}</h3>
            <h2 id ="destination">Where: ${trip.destination.location}</h3>
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
  addFlitPickr() {
    let dateSelected = flatpickr("#pickADate", {});
  }
}

export default domUpdates;