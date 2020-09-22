let domUpdates = {
  populateCards(trips) {
    let cardCatalyst = document.getElementById('notWelcome')
    trips.forEach(trip =>{
      let date = trip.date.toString().split('00')[0]
      let duration = trip.duration.toString().split('00')[0]
      cardCatalyst.insertAdjacentHTML("afterend",
        `<div id = "${trip.destination.location}" class = "card">
            <h3 id ="date">When: ${date} - ${duration}
        `
      )
    })
    console.log(trips)
  }
}

export default domUpdates;