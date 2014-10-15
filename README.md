SuperAgent as Promise(d)
=====================

[SuperAgent](http://visionmedia.github.io/superagent/) as [Promise](https://github.com/petkaantonov/bluebird/blob/master/API.md)

Installation
------------

    npm install superagent-as-promised

Usage
-----

    var request = require('superagent-as-promised');

    request
    .get('/location')
    .then( function(response) {
      console.log("Got "+response.text);
    })
    .catch( function(error) {
      console.dir(error);
    })

is syntactic sugar for:

    var promise = request
      .get('/location')
      .end();

    promise
      .then( function(response) {
        console.log("Got "+response.text);
      })
      .catch( function(error) {
        console.dir(error);
      })
