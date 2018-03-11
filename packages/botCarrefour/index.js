const request = require('request');

module.exports = class BotCarrefour {
  /**
   * Constructor
   */
  constructor (coord) {
    this.longitude = coord.lon;
    this.latitude = coord.lat;
  }

  /**
   * Initialize
   * @return {string} body
   */
  init (callback) {
    const options = {'method': 'GET',
      'url': 'https://api.fr.carrefour.io/v1/openapi/stores',
      'qs':
   {'longitude': this.longitude,
     'latitude': this.latitude,
     'radius': '15000'
   },
      'headers':
   {'accept': 'application/json',
     'x-ibm-client-secret': 'C1yD0eY7sT2yL8sJ4yR4tX5fW7eP7tV1dC6qA7fX4aU1gQ8oX8',
     'x-ibm-client-id': '98cc4890-9c5b-4a9c-b2d9-3c9fdf7c4c18'
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
  /**
   * getJson
   * @return {string} this.json
   */
  getJsonList () {
    return this.json.list;
  }

  /**
   * getAdresse
   * @return {String} address
   */
  getAdresse (pos) {
    return this.json.list[pos].address;
  }
  /**
   * getBanner
   * @return {String} banner
   */
  getBanner (pos) {
    return this.json.list[pos].banner;
  }
  /**
   * getCity
   * @return {String} city
   */
  getCity (pos) {
    return this.json.list[pos].city;
  }
  /**
   * getGasStation
   * @return {String} gas_station
   */
  getGasStation (pos) {
    return this.json.list[pos].gas_station;
  }
  /**
   * getDrive
   * @return {String} drive
   */
  getDrive (pos) {
    return this.json.list[pos].drive;
  }
  /**
   * getLatitude
   * @return {String} latitude
   */
  getLatitude (pos) {
    return this.json.list[pos].latitude;
  }
  /**
   * getLongitude
   * @return {String} longitude
   */
  getLongitude (pos) {
    return this.json.list[pos].longitude;
  }
};
