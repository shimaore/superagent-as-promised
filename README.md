SuperAgent as Promise(d)
=====================

[SuperAgent](http://visionmedia.github.io/superagent/) as [Promise](https://github.com/petkaantonov/bluebird/blob/master/API.md)

Installation
------------

    npm install superagent-as-promised

Usage
-----

    var request = require('superagent');
    require('superagent-as-promised')(request);

Then

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
      .endAsync();

    promise
      .then( function(response) {
        console.log("Got "+response.text);
      })
      .catch( function(error) {
        console.dir(error);
      })

Options
-------

    require('superagent-as-promised')(SuperAgent,Promise);

`SuperAgent` must be a SuperAgent class; it is extended with `endAsync()`, `then`, and `catch` methods.
The optional `Promise` parameter allows you to provide your own Promise class; `bluebird` is used by default.
