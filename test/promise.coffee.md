    chai = require 'chai'
    chai.use require 'chai-as-promised'
    chai.should()

    Request = require 'superagent'
    Promise = require 'bluebird'
    Promise::foo = 42
    (require '..') Request, Promise
    express = require 'express'

    describe 'SuperAgent as Promise with a Promise class', ->

      server = null

      before ->
        app = express()
        app.get '/foo.txt', (req,res) ->
          res.send 'OK'
        app.get '/foo.json', (req,res) ->
          res.json ok:true
        server = app.listen 3000

      after ->
        server.close()

      it 'should be successful', ->
        Request
        .get 'http://127.0.0.1:3000/foo.txt'
        .endAsync()
        .should.be.fulfilled

      it 'should use the provided Promise lib', ->
        Request
        .get 'http://127.0.0.1:3000/foo.txt'
        .endAsync()
        .should.have.property 'foo', 42
