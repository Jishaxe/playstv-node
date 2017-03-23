request = require("request")
querystring = require("querystring")
const url = "https://api.plays.tv/data/v1"

class PlaysTV {
  constructor(appid, appkey) {
    this.appid = appid
    this.appkey = appkey
    this.api = this

    this.users = {
      get: this.getUser.bind(this)
    }

    this.videos = {
      search: this.searchVideos.bind(this)
    }
  }
  
  /**
   * Makes a GET request to PlaysTV API
   * @param {String} endpoint The endpoint to use, such as /auth/verify
   * @param {String} args query params to use, this will add in the app id and key for you
   */
  _get(endpoint, args) {
    args.appid = this.appid
    args.appkey = this.appkey
    let query = querystring.stringify(args) 

    return new Promise((resolve, reject) => {
      request(`${url}${endpoint}?${query}`, (error, response, body) => {
          if (error) reject(error)
          else if (response.statusCode !== 200) reject(`Got a ${response.statusCode} instead of 200 on ${endpoint}: ${body}`)
          else resolve(response)
      })
    })
  }

  /**
   * Verifies the API key and token given in the constructor
   */
  verify() {
    return this._get("/auth/verify", {})
  }

  /**
   * Gets a user with the specified username
   * @param {String} username The username to request
   */
  getUser(username) {
    return this._get(`/users/${username}`, {}).then((response) => Promise.resolve(JSON.parse(response.body).content, (error) => Promise.reject(error)))
  }

  /**
   * Search videos matching the provided parameters in searchParams
   * userId string Plays.tv handle of the user who curated the video
   * gameId string Plays.tv ID of the game
   * hashtags Array of hashtags without the hashtag (#)
   * metatags An array of metatags with the hashtag (#) removed
   * @param {Object} searchParams 
   * @param {Number} limit Results per page
   * @param {Number} page Page number to get
   * @param {String} sort Sorting technique (trending, popular, recent)
   * @param {String} sortdir Direction to sort (asc, desc)
   */
  searchVideos(searchParams, limit = 20, page = 0, sort = "recent", sortdir = "asc") {

  }
}

module.exports = function (config) {
  return new PlaysTV(config.appid, config.appkey)
}
