SuperAgent as Promised
======================

    Promise = require 'bluebird'

    # Request.Request.prototype.end = Promise.promisify Request.Request.prototype.end

    module.exports = (Request) ->
      Request.Request.prototype.endAsync = ->
        new Promise (resolve,reject) =>
          try
            @end (error, response) ->
              if error?
                reject error
                return
              if response.error?
                reject response.error
                return
              resolve response
          catch error
            reject error

      Request.Request.prototype.then = ->
        @endAsync()
        .then arguments...
      Request.Request.prototype.catch = ->
        @endAsync()
        .catch arguments...
