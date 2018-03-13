const request = require('request');

module.exports = class BotYoutube {
  constructor (name) {
    this.name = name;
  }

  /**
   * Initialize
   * @return {string} body
   */
  init (callback) {
    request({'url': `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.name}&key=AIzaSyBzhXQGlpp20V71dGCT_67REdUlWe-Gpog`, 'json': true}, (err, res, body)=> {
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
      this.json = result;
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }
  /**
   * getJson
   * @return {Object} this.json
   */
  getJson () {
    return this.json;
  }
  /**
   * getId
   * @return {string} videoId
   */
  getId (pos) {
    return this.json.items[pos].id.videoId;
  }
  /**
   * getTitleVideo
   * @return {string} title
   */
  getTitleVideo (pos) {
    return this.json.items[pos].snippet.title;
  }
  /**
   * getTittleChanel
   * @return {string} channelTitle
   */
  getTittleChanel (pos) {
    return this.json.items[pos].snippet.channelTitle;
  }
  /**
   * getThumbnails
   * @return {string} thumbnails
   */
  getThumbnails (pos) {
    return this.json.items[pos].snippet.thumbnails.default.url;
  }
};
