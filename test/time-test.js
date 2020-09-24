import chai from 'chai';
const expect = chai.expect;
import time from '../src/scripts/time.js';
describe('Time', () => {
  let date = new Date(2020, 0, 1);
  let tomorrow = new Date(2020, 0, 2);
  let yesterday = new Date(2019, 11, 31);
  let futureDate = new Date(2021, 1, 2);
  let pastDate = new Date(2019, 1, 2);
  describe('getDate()', () => {
    it('Should return a javascript Object Date', () => {
      expect(typeof(time.getDate("2020/12/20"))).to.equal('object')
    });
  });
  describe('daysFromDate()', () => {
    it('Should return date from specified days after / before', () => {
      expect(time.daysFromDate(date, 1).getTime()).to.equal(tomorrow.getTime());
      expect(time.daysFromDate(date, -1).getTime()).to.equal(yesterday.getTime());
    });
  });
  describe('isBetween()', () => {
    it('Should evaluate trip status according to current date', () => {
      expect(time.isBetween('approved', pastDate, pastDate)).to.equal('past');
      expect(time.isBetween('approved', futureDate, futureDate)).to.equal('upcoming');
      expect(time.isBetween('approved', new Date(), futureDate)).to.equal('present');
    });
  });
});