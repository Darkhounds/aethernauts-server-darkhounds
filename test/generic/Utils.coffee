should                      = (require 'chai').should()
#
describe 'The Generic Utils', ->
    Utils           = require "../../src/generic/Utils"
    it 'Should be defined',                             -> Utils.should.exist
    it 'Should implement the "getIndexFromByProperty"', -> Utils.should.respondTo 'getIndexFromByProperty' 
#
