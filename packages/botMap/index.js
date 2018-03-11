const request = require('request');

module.exports = class BotMap {
  /**
   * Constructor
   */
  constructor (place) {
    this.place = place;
  }

  /**
   * Initialize
   * @return {string} body
   */
  init (callback) {
    const options = { 
        'method': 'GET',
        'url': 'https://maps.googleapis.com/maps/api/geocode/json',
        'qs': { 
        'address':this.place,
        'key': 'AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog'
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
   * @return {BotMap} 
   */
  run () {
    let sync = true;

    this.init(result => {
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

  getLatitude () {
    return this.json.results[0].geometry.location.lat;
  }
  /**
   * getLongitude
   * @return {String} longitude
   */
  getLongitude () {
    return this.json.results[0].geometry.location.lng;
  }
};
