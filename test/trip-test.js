import chai from 'chai';
import Trip from '../src/classes/trip';
const expect = chai.expect;
let trip, tripInfo;

describe('See if the tests are running', function() {
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


});
