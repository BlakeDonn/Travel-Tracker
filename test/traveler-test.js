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
  describe('Property Tests', () => {
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
  describe.only('Method Tests', () => {
    it('Should format provided trips into trip classes', () => {
      traveler.formatTrips()
      expect(traveler.trips[0]).to.be.an.instanceof(Trip)
    });

    it('Should add Destinations to trips', () => {
      traveler.addDestinationToUserTrips()
      expect(traveler.trips[0].destinationName).to.equal(travelerInfo[2][1].destination)
    });

    it('Should add Price to trips', () => {
      traveler.addDestinationToUserTrips()
      expect(traveler.trips[0].price).to.equal(1440)
    });

    it('Should add Price to trips', () => {
      traveler.addDestinationToUserTrips()
      expect(traveler.trips[0].price).to.equal(1440)
    });

    it('Should only return Destination name if argument passed', () => {
      let nameReturned = traveler.addDestinationToUserTrips([travelerInfo[1][1]])
      expect(nameReturned).to.equal('Tampa, Florida')
    });

    it('Should sort trips by date', () => {
      traveler.formatTrips()
      traveler.addDestinationToUserTrips()
      traveler.sortTrips()
      expect(traveler.trips[2].destinationName).to.equal('Tampa, Florida')
    });

    it('Should evaluate trip duration', () => {
      traveler.formatTrips()
      traveler.setTripDuration()
      expect(traveler.trips[2].displayableDates).to.equal('Wed Sep 18 2019  - Sun Sep 22 2019 ')
    });

    it('Should only return dates if argument passed', () => {
      let testReturn = traveler.setTripDuration([new Trip(travelerInfo[1][1])])
      expect(testReturn).to.equal('Sun Oct 18 2020  - Fri Oct 23 2020 ')
    });

    it('Should assign Trip Status', () => {
      traveler.formatTrips()
      traveler.setTripDuration()
      traveler.specifyTripStatus()
      expect(traveler.trips[0].status).to.equal('pending')
      expect(traveler.trips[1].status).to.equal('upcoming')
      expect(traveler.trips[2].status).to.equal('past')
    });
  });
});
