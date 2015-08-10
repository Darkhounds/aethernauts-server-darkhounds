should      = (require 'chai').should()
#
describe 'The Abstract Model', ->
    AbstractModel   = require "../src/abstract/model"    
    it 'Should be defined',                             -> should.exist AbstractModel
    it 'Should implement the "decorate" method',        -> AbstractModel.should.itself.respondTo 'decorate'
    it 'Should have missing argument error declared',   -> AbstractModel.ERROR_MISSING_ARGUMENT.should.be.a 'string'
    it 'Should have wrong argument type declared',      -> AbstractModel.ERROR_WRONG_ARGUMENT.should.be.a 'string'
    it 'Should throw an error when trying to instantiate',  ->
        AbstractModel.bind(undefined).should.throw Error, AbstractModel.ERROR_CANNOT_INSTANTIATE_DECORATOR_CLASS
    
    describe "As an instance", ->
        aModelProto = (_driver) ->
            AbstractModel.decorate this
            this.setDriver _driver
        driver  = {}
        aModel  = new aModelProto driver
        it 'Should implement the setDriver method',                 -> aModel.should.respondTo "getDriver"
        it 'Should throw Error on first argument missing',
            -> aModel.setDriver.bind(undefined).should.throw Error, AbstractModel.ERROR_MISSING_ARGUMENT
        it 'Should throw Error on first argument not an object',
            -> aModel.setDriver.bind(undefined, 'value').should.throw Error, AbstractModel.ERROR_WRONG_ARGUMENT
        it 'Should return the same driver injected on creation',    -> aModel.getDriver().should.equal driver

