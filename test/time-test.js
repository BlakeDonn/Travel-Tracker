import chai from 'chai';
const expect = chai.expect;
import time from '../src/scripts/time.js';
describe('Time', () => {
  let date = new Date(2020, 0, 1);
  let tomorrow = new Date(2020, 0, 2);
  let yesterday = new Date(2019, 11, 31);
  describe('daysFromDate()', () => {
    it('should return a Date object corresponding to the Date a given number of days away from a reference Date', () => {
      expect(time.daysFromDate(date, 1).getTime()).to.equal(tomorrow.getTime());
      expect(time.daysFromDate(date, -1).getTime()).to.equal(yesterday.getTime());
    });
  });
});