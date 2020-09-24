import chai from 'chai';
import Trip from '../src/classes/trip';
import Traveler from '../src/classes/traveler';
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
    trip = new Trip(tripInfo);
  });
  describe('Property Tests', () => {
    it('Should be a function', () => {
      expect(Trip).to.be.a('function');
    });

    it('Should be an instance of Trip', () => {
      expect(trip).to.be.an.instanceof(Trip)
    });

    it('Should store an trip id', () => {
      expect(trip.id).to.equal(6)
    });

    it('Should store a uesrId', () => {
      expect(trip.userID).to.equal(29)
    });

    it('Should store a destinationID', () => {
      expect(trip.destinationID).to.equal(35)
    });

    it('Should store traveler amount', () => {
      expect(trip.travelers).to.equal(3)
    });

    it('Should store a Date', () => {
      expect(trip.date).to.equal("2020/09/20")
    });

    it('Should store a duration', () => {
      expect(trip.duration).to.equal(9)
    });

    it('Should have a status of pending by default', () => {
      tripInfo.status = null;
      let testTrip = new Trip (tripInfo)
      expect(testTrip.status).to.equal('pending')
    });

    it('Should store a status', () => {
      expect(trip.status).to.equal('approved')
    });
 
    it('Should be able to store suggested activity', () => {
      expect(trip.suggestedActivities).to.eql([])
    });
  });
  describe('Method Tests', () => {
    let traveler, travelerInfo;
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
      traveler.formatTrips()
      traveler.addDestinationToUserTrips()
      traveler.sortTrips()
      traveler.setTripDuration()
    });
    it('Should be able to store new data dynamically', () => {
      expect(Object.keys(traveler.trips[1]).length).to.above(Object.keys(trip).length)
    });
    it('Should reassign trip status for better readability', () => {
      expect(traveler.trips[1].status).to.equal('approved')
      expect(traveler.trips[1].determineTripStatus()).to.equal('past')
    });

    it('Should reassign dynamically', () => {
      expect(traveler.trips[2].status).to.equal('approved')
      expect(traveler.trips[2].determineTripStatus()).to.equal('upcoming')
    });

    it('Should NOT reassign pending status', () => {
      expect(traveler.trips[0].status).to.equal('pending')
      expect(traveler.trips[0].determineTripStatus()).to.equal('pending')
    });

    it('Should return a sortable date', () => {
      expect(traveler.trips[0].setTime()).to.be.equal(1568606400000)
    });

    it('Should return a date range to be evaluated', () => {
      expect(traveler.trips[0].setDuration().length).to.equal(2)
    });
  });
});
