// Generated by CoffeeScript 1.9.1
(function() {
  var Promise;

  Promise = require('bluebird');

  module.exports = function(Request) {
    Request.Request.prototype.endAsync = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var error;
          try {
            return _this.end(function(error, response) {
              if (error) {
                reject(error);
                return;
              }
              if (response.error) {
                reject(response.error);
                return;
              }
              return resolve(response);
            });
          } catch (_error) {
            error = _error;
            return reject(error);
          }
        };
      })(this));
    };
    Request.Request.prototype.then = function() {
      var ref;
      return (ref = this.endAsync()).then.apply(ref, arguments);
    };
    Request.Request.prototype["catch"] = function() {
      var ref;
      return (ref = this.endAsync())["catch"].apply(ref, arguments);
    };
    return Request;
  };

}).call(this);
