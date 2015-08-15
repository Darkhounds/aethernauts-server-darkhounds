should                      = (require 'chai').should()
Error                       = require "../../src/generic/Error"
#
describe 'The Abstract Decorator', ->
    Decorator           = require "../../src/abstract/Decorator"
    it 'should be defined',                                         ->
        Decorator.should.exist
    it 'should implement the "ERROR_DECORATOR_NOT_INSTANTIABLE" constant', ->
        Decorator.should.have.property('ERROR_DECORATOR_NOT_INSTANTIABLE')
