import chai from 'chai';
import Trip from '../src/classes/trip';
const expect = chai.expect;
let trip, tripInfo, dummyDesti;

describe('Trip', function() {
  beforeEach(() => {
    tripInfo = {
      "id": 6,
      "userID": 29,
      "destinationID": 35,
      "travelers": 3,
      "date": "2020/09/20",
      "duration": 9,
      "status": "approved",
      "suggestedActivities": []
    }
    dummyDesti = {
        "id": 40,
        "destination": "Blake's house",
        "estimatedLodgingCostPerDay": 600,
        "estimatedFlightCostPerPerson": 80
    }
    trip = new Trip(tripInfo, 500, dummyDesti);
  });

  it('Should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('Should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceof(Trip)
  });

  it('Should store a Date', () => {
    expect(trip.date.toString()).to.include('2020')
  });

  it('Should store an time to evaluate with', () => {
    expect(typeof(trip.time)).to.equal('number')
  });

  it('Should be able to evaluate trip duration', () => {
    expect(trip.duration.toString()).to.include('2020')
  });

  it('Should evaluate present status correctly', () => {
    expect(trip.tripStatus).to.be.equal('present')
  });

  it('Should evaluate past status correctly', () => {
    tripInfo.date = '2020/07/20'
    let newTrip = new Trip(tripInfo, 500, dummyDesti)
    expect(newTrip.tripStatus).to.be.equal('past')
  });

  it('Should evaluate present status correctly', () => {
    tripInfo.date = '2020/11/20'
    let newTrip = new Trip(tripInfo, 500, dummyDesti)
    expect(newTrip.tripStatus).to.be.equal('upcoming')
  });

  it('Should evaluate pending status correctly', () => {
    tripInfo.status = 'pending'
    let newTrip = new Trip(tripInfo, 500, dummyDesti)
    expect(newTrip.tripStatus).to.be.equal('pending')
  });

  it('Should store a trip destination', () => {
    expect(Object.keys(trip.destination)).to.eql(['location', 'image', 'alt'])
  });

});
