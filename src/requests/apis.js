let travelFetch = {
  getCurrentTraveler(userId) {
    const promise = fetch(`https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers/${userId}`)
      .then(response => response.json())
      .then(data => console.log(data))
    return promise;
  }
}
export default travelFetch