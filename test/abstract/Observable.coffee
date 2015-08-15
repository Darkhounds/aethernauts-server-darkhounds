should                      = (require 'chai').should()
#
describe 'An Observable', ->
    Observable              = require "../../src/abstract/Observable"
    it 'Should be defined',                             -> Observable.should.exist
    #
    describe "As an instance", ->
        instance            = Observable {}
        it 'should implement the "addEventListener"',       -> instance.should.respondTo 'addEventListener'
        it 'should implement the "removeEventListener"',    -> instance.should.respondTo 'removeEventListener'
        it 'should implement the "dispatchEvent"',          -> instance.should.respondTo 'dispatchEvent'
