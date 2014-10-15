SuperAgent as Promised
======================

    Request = require 'superagent'
    Promise = require 'bluebird'

    # Request.Request.prototype.end = Promise.promisify Request.Request.prototype.end

    _end = Request.Request.prototype.end
    Request.Request.prototype.end = ->
      new Promise (resolve,reject) =>
        try
          _end.call this, (error, response) ->
            if error
              reject error
              return
            if response.error
              reject response.error
              return
            resolve response
        catch error
          reject error

    Request.Request.prototype.then = ->
      @end()
      .then arguments...
    Request.Request.prototype.catch = ->
      @end()
      .catch arguments...

    module.exports = Request
