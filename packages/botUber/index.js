const request = require('request');
const Botmap = require('botmap');

module.exports = class BotUber {
  /**
   * Constructor
   */
  constructor (data) {
    this.startLongitude = data.coord.lon;
    this.startLatitude = data.coord.lat;
    this.destination = data.dest;
  }

  /**
   * Initialize
   * @return {BotCarrefour}
   */
  init () {
    const map = new Botmap (this.destination);

    map.run();
    this.endLatitude = map.getLatitude();
    this.endLongitude = map.getLongitude();
    return;
  }

  /**
   * Request
   * @return {string} body
   */
  request (callback) {
    const options = {
      'method': 'GET',
      'url': 'https://api.uber.com/v1.2/estimates/price',
      'qs': {
        'start_longitude': this.startLongitude,
        'start_latitude': this.startLatitude,
        'end_latitude': this.endLatitude,
        'end_longitude': this.endLongitude
      },
      'headers': {
        'Authorization': 'Token ' + 'aBxZ-6xJF5xCegAjjXXSMNCy_fI0SCKXbPq86PkZ',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/json'
      }
    };

    request(options, (error, response, body)=> {
      if (error) {
        throw error;
      }
      callback(body);
      return body;
    });
  }
  /**
   * Run
   * @return {BotCarrefour} 
   */
  run () {
    let sync = true;

    this.init();

    this.request(result => {
      this.json = JSON.parse(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }

  /**
   * getJson
   * @return {string} this.json
   */
  getJson () {
    return this.json;
  }

  /**
   * getJsonPrice
   * @return {Object} this.json.prices
   */
  getJsonPrice () {
    return this.json.prices;
  }
  /**
   * getDisplay_name
   * @return {String} display_name
   */
  getDisplayName (pos) {
    return this.json.prices[0][pos].display_name;
  }
  /**
   * getDuration
   * @return {String} duration
   */
  getDuration (pos) {
    return this.json.prices[0][pos].duration;
  }
  /**
   * getEstimate
   * @return {String} distance
   */
  getEstimate (pos) {
    return this.json.prices[0][pos].distance;
  }
  /**
   * getStartLongitude
   * @return {String} this.startLongitude
   */
  getStartLongitude () {
    return this.startLongitude;
  }
  /**
   * getStartLatitude
   * @return {String} this.startLatitude
   */
  getStartLatitude () {
    return this.startLatitude;
  }
  /**
   * getEndLatitude
   * @return {String} this.startLatitude
   */
  getEndLatitude () {
    return this.endLatitude;
  }
  /**
   * getEndLatitude
   * @return {String} this.startLongitude
   */
  getEndLongitude () {
    return this.endLongitude;
  }
};
