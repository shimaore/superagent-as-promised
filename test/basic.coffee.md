    chai = require 'chai'
    chai.use require 'chai-as-promised'
    chai.should()

    Request = require 'superagent'
    (require '..') Request
    express = require 'express'

    describe 'SuperAgent as Promise', ->

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

      it 'should return a value', ->
        Request
        .get 'http://127.0.0.1:3000/foo.txt'
        .endAsync()
        .then (res) ->
          res.text
        .should.eventually.equal 'OK'

      it 'should return a json value', ->
        Request
        .get 'http://127.0.0.1:3000/foo.json'
        .accept 'json'
        .endAsync()
        .then (res) ->
          res.body
        .should.eventually.deep.equal ok:true

      it 'should fail appropriately', ->
        Request
        .get 'http://127.0.0.1:3000/unknown'
        .endAsync()
        .should.be.rejected

      it 'should handle then()', ->
        Request
        .get 'http://127.0.0.1:3000/foo.json'
        .accept 'json'
        .then (res) ->
          res
        .should.eventually.have.property 'ok', true

      it 'should handle then() with body', ->
        Request
        .get 'http://127.0.0.1:3000/foo.json'
        .accept 'json'
        .then (res) ->
          res.body
        .should.eventually.deep.equal ok:true

      it 'should reject on error', ->
        Request
        .get 'http://127.0.0.1:3000/unknown'
        .then ->
          null
        .should.be.rejected

      it 'should handle catch()', ->
        Request
        .get 'http://127.0.0.1:3000/unknown'
        .catch (error) ->
          caught:true
        .should.eventually.deep.equal caught:true
