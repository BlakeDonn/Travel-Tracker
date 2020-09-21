import chai from 'chai';
import Trip from '../src/classes/trip';
import time from '../src/scripts/time';
const expect = chai.expect;
let trip, tripInfo;

describe.only ('See if the tests are running', function() {
  beforeEach(() => {
    tripInfo = {
      "id": 6,
      "userID": 29,
      "destinationID": 35,
      "travelers": 3,
      "date": "2020/06/29",
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

  it('Should set trip status using time module', () => {
    expect(trip.tripStatus).to.be.equal('past')
  });


});
