const request = require('request');

module.exports = class BotMeteo {
  constructor (name) {
    this.name = name;
  }

  /**
   * Initialize
   * @return {string} body
   */
  init (callback) {
    const options = {
      'method': 'GET',
      'url': 'https://api.openweathermap.org/data/2.5/weather',
      'qs': {
        'q': this.name,
        'APPID': 'a4ead3f50eaaa932f599d8ee4fc963b9',
        'lang': 'fr',
        'units': 'metric'
      },
      'headers': {
        'accept': 'application/json',
        'x-ibm-client-secret': 'C1yD0eY7sT2yL8sJ4yR4tX5fW7eP7tV1dC6qA7fX4aU1gQ8oX8',
        'x-ibm-client-id': '98cc4890-9c5b-4a9c-b2d9-3c9fdf7c4c18'
      }
    };

    request(options, (err, res, body) => {
      if (err) {
        throw err;
      }
      callback(body);
      return body;
    });
  }

  /**
   * Run
   * @return {BotYoutube} 
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
   * getWeather
   * @return {string} description
   */
  getWeatherDesc () {
    return this.json.weather[0].description;
  }
  /**
   * getTemperature
   * @return {string} temperature
   */
  getTemperature () {
    return this.json.main.temp;
  }
};
