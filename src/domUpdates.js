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
    console.log(trips)
  }
}

export default domUpdates;