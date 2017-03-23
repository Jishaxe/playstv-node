request = require("request")
const endpoint = "https://api.plays.tv/data/v1"

class PlaysTV {
  constructor(appid, appkey) {
    this.appid = appid
    this.appkey = appkey
  }

  /**
   * Verifies the API key and token given in the constructor
   */
  verify() {
    let appid = this.appid
    let appkey = this.appkey

    return new Promise((resolve, reject) => {
      console.log(`/auth/verify?appid=${appid}&appkey=${appkey}`)
      request(endpoint + `/auth/verify?appid=${appid}&appkey=${appkey}`, (error, response, body) => {
          if (error) reject(error)
          else if (response.statusCode !== 200) reject(`Got a ${response.statusCode} instead of 200 on /auth/verify: ${body}`)
          else resolve(response)
      })
    })
  }
}

module.exports = function (config) {
  return new PlaysTV(config.appid, config.appkey)
}
