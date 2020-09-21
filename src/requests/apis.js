let travelFetch = {
  dashboardInfo(userId) {
    return Promise.all([
      fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${userId}`),
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
    ])
  },
  destinationInfo(destinationIds) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
      .then(response => response.json())
      .then(values => values.destinations.filter(x => destinationIds.includes(x.id)))
  }
}
export default travelFetch