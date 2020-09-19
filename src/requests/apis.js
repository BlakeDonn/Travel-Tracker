let travelFetch = {
  dashboardInfo(userId) {
    return Promise.all([
      fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${userId}`),
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'), 
    ])
  }
}
export default travelFetch