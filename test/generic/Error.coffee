should                      = (require 'chai').should()
#
describe 'The Generic Error', ->
    Error           = require "../../src/generic/Error"
    it 'should be defined',                         -> Error.should.exist
    #
    describe 'As an instance', ->
        instance = new Error 'foo', 'bar'
        it 'should have "code" set to "foo"',       -> instance.code.should.be.equal 'foo'
        it 'should have "message" set to "bar"',    -> instance.message.should.be.equal 'bar'
