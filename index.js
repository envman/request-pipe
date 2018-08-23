const request = require('request')

module.exports = function requestPipe(opts, dest) {

  return new Promise((resolve, reject) => {
    request(opts)
    .on('error', err => {
      reject(err)
    })
    .on('response', (response) => {
      if (response.statusCode != 200) {
        reject(new Error(`Non Success Status Code ${response.statusCode}`))
      } else {
        response.pipe(dest)
          .on('end', _ => {
            resolve()
          })
      }
    })
  })
}
