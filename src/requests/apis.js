let travelFetch = {
  dashboardInfo(userId) {
    return Promise.all([
      fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${userId}`),
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
    ])
  },
  tripInfo(){
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  },
  destinationInfo() {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
      .then(response => response.json())
  },
  addTrip(someDataToSend) {
    console.log(someDataToSend)
    const tripUrl = 'https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'
    const promise = fetch(tripUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(someDataToSend),
    })                                                                
    return promise; 
  }
}
export default travelFetch