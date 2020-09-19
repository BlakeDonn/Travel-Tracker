
import './css/base.scss';
import travelFetch from './requests/apis';
import './images/turing-logo.png'


travelFetch.dashboardInfo(5)   
  .then(promises => Promise.all(promises.map(response => response.json())))
  .then(values => console.log(values))
console.log('This is the JavaScript entry file - your code begins here.');