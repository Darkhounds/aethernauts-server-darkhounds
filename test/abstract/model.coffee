should      = (require 'chai').should()
#
describe 'The Abstract Model', ->
    Model   = require "../../src/abstract/Model"    
    it 'Should be defined',                     -> Model.should.exist
    #
    describe "As an instance", ->
        instance            = Model {}
        it 'should implement the "setDriver"',  -> instance.should.respondTo 'setDriver'
        it 'should implement the "getDriver"',  -> instance.should.respondTo 'getDriver'
