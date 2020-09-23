import chai from 'chai';
import Trip from '../src/classes/trip';
const expect = chai.expect;
let trip, tripInfo;

describe ('See if the tests are running', function() {
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
    },
    trip = new Trip(tripInfo);
  });

  it('Should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('Should be an instance of Trip', () => {
    expect(trip).to.be.an.instanceof(Trip)
  });

  it('Should set trip year on instantiation', () => {
    expect(trip.year).to.be.equal('2020')
  });

  it('Should evaluate present status correctly', () => {
    expect(trip.tripStatus).to.be.equal('present')
  });

  it('Should evaluate past status correctly', () => {
    tripInfo.date = '2020/07/20'
    let newTrip = new Trip(tripInfo)
    expect(newTrip.tripStatus).to.be.equal('past')
  });

  it('Should evaluate present status correctly', () => {
    tripInfo.date = '2020/11/20'
    let newTrip = new Trip(tripInfo)
    expect(newTrip.tripStatus).to.be.equal('upcoming')
  });

  it('Should evaluate pending status correctly', () => {
    tripInfo.status = 'pending'
    let newTrip = new Trip(tripInfo)
    expect(newTrip.tripStatus).to.be.equal('pending')
  });

});
