SuperAgent as Promised
======================

    # Request.Request.prototype.end = Promise.promisify Request.Request.prototype.end
    NativePromise = Promise

    module.exports = (Request,Promise = NativePromise) ->
      Request.Request.prototype.endAsync = ->
        new Promise (resolve,reject) =>
          try
            @end (error, response) ->
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
        @endAsync()
        .then arguments...
      Request.Request.prototype.catch = ->
        @endAsync()
        .catch arguments...

      Request
