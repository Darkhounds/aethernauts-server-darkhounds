should      = (require 'chai').should()
#
describe 'The Abstract Model', ->
    Controller   = require "../../src/abstract/Controller"
    it 'Should be defined',                     -> Controller.should.exist
    #
    describe "As an instance", ->
        instance            = Controller {}
