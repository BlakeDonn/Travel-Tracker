import chai from 'chai';
import Traveler from '../src/classes/traveler';
const expect = chai.expect;
let traveler;

describe('See if the tests are running', function() {
  beforeEach(() => {
    traveler = new Traveler();
  });

  it('Should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('Should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
  });
});
