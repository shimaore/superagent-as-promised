SuperAgent as Promise(d)
=====================

[SuperAgent](http://visionmedia.github.io/superagent/) as Promise.

The returned Promise will reject both on SuperAgent error, and on error in the response.

Compare with [the promise plugin](https://github.com/jomaxx/superagent-promise-plugin), which has similar semantics but a different interface.

Also, SuperAgent 2.0 now returns native Promises from [`req.then`](https://visionmedia.github.io/superagent/#generator-support) (but it sticks to its original semantics).

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
The optional `Promise` parameter allows you to provide your own Promise class; the native Promise class is used by default.
