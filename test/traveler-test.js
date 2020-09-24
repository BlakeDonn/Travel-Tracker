import chai from 'chai';
import Traveler from '../src/classes/traveler';
const expect = chai.expect;
let traveler, travelerInfo, trip;

describe.only('Traveler', function() {
  beforeEach(() => {
    travelerInfo = {
      "id": 6,
      "name": "Blake D",
      "travelerType": "history buff"
    }
    tripInfo = {
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
    }
    traveler = new Traveler(travelerInfo);
    trip = new Trip(tripInfo);
  });

  it('Should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('Should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
  });

  it('Should store a specific travelers info', () => {
    expect(traveler.userInfo).to.equal(travelerInfo)
  });

  it('Should not store bad info', () => {
    travelerInfo.id = '6',  travelerInfo. name = 43, travelerInfo.travelerType = 52;
    let testTraveler = new Traveler(travelerInfo)
    expect(testTraveler.userInfo).to.equal(null)
  });

  it('Should start with no trips', () => {
    expect(traveler.trips).to.eql([])
  });

  it('Should poulate trips from API', () => {
    expect(traveler.trips).to.eql([])
  });

});
