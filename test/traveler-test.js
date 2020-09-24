import chai from 'chai';
import Traveler from '../src/classes/traveler';
import Trip from '../src/classes/trip';
const expect = chai.expect;
let traveler, travelerInfo, trip, tripInfo;

describe.only('Traveler', function() {
  beforeEach(() => {
    travelerInfo = [{
      "id": 6,
      "name": "Blake D",
      "travelerType": "history buff"
    },
    [{
      "travelers": 3,
      "destinationID": 14,
      "date": "2019/09/16",
      "duration": 6,
      "status": "pending",
    },
    {
      "travelers": 1,
      "destinationID": 14,
      "date": "2020/10/18",
      "duration": 5,
      "status": "approved",
    },
    {
      "travelers": 2,
      "destinationID": 25,
      "date": "2019/09/18",
      "duration": 4,
      "status": "approved",
    }],
    [{
      "id": 25,
      "destination": "House, Blake",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
    },
    {
      "id": 14,
      "destination": "Tampa, Florida",
      "estimatedLodgingCostPerDay": 65,
      "estimatedFlightCostPerPerson": 350,
    }]
    ]    
    traveler = new Traveler(travelerInfo);
  });
  describe('Property Tests()', () => {
    it('Should be a function', () => {
      expect(Traveler).to.be.a('function');
    });

    it('Should be an instance of Traveler', () => {
      expect(traveler).to.be.an.instanceof(Traveler)
    });

    it('Should store a specific travelers info', () => {
      expect(traveler.userInfo).to.eql(travelerInfo[0])
    });

    it('Should not store bad info', () => {
      travelerInfo.id = '6',  travelerInfo. name = 43, travelerInfo.travelerType = 52;
      let testTraveler = new Traveler([travelerInfo])
      expect(testTraveler.userInfo).to.equal(null)
    });

    it('Should start with no trips if not provided', () => {
      travelerInfo[1] = [] 
      let testTraveler = new Traveler(travelerInfo)
      expect(testTraveler.trips).to.eql([])
    });

    it('Should poulate trips from API', () => {
      expect(traveler.trips).to.eql(travelerInfo[1])
    });

    it('Should poulate destinations from API', () => {
      expect(traveler.possibleDestinations).to.eql(travelerInfo[2])
    });

    it('Should poulate destinations from API', () => {
      expect(traveler.possibleDestinations).to.eql(travelerInfo[2])
    });
  });
  describe('daysFromDate()', () => {

  });

});
