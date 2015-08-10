should                      = (require 'chai').should()
#
describe 'An Observable', ->
    DecoratorObservable     = require "../decorator/observable"
    it 'Should be defined',                             -> should.exist DecoratorObservable
    it 'Should implement the "decorate" method',        -> DecoratorObservable.should.itself.respondTo 'decorate'
    it 'Should have missing argument error declared',   -> DecoratorObservable.ERROR_MISSING_ARGUMENT.should.be.a 'string'
    it 'Should have wrong argument type declared',      -> DecoratorObservable.ERROR_WRONG_ARGUMENT.should.be.a 'string'
    it 'Should throw an error when trying to instantiate',  ->
        DecoratorObservable.bind(undefined).should.throw Error, DecoratorObservable.ERROR_CANNOT_INSTANTIATE_DECORATOR_CLASS
    
    describe "As an instance", ->
        dObservable             = DecoratorObservable.decorate {}
        
        # addEventListener
        it 'Should implement the addEventListener method', -> dObservable.should.respondTo "addEventListener"
        it 'Should throw an error when addEventListener is missing an event type', ->
            dObservable.addEventListener.bind(undefined).should.throw Error, DecoratorObservable.ERROR_MISSING_ARGUMENT
        it 'Should throw an error when addEventListener has the wrong type as event type', ->
            dObservable.addEventListener.bind(undefined, true).should.throw Error, DecoratorObservable.ERROR_WRONG_ARGUMENT
        it 'Should throw an error when addEventListener is missing a callback', ->
            dObservable.addEventListener.bind(undefined, "SomeEvent").should.throw Error, DecoratorObservable.ERROR_MISSING_ARGUMENT
        it 'Should throw an error when addEventListener has the wrong type as callback', ->
            dObservable.addEventListener.bind(undefined, "SomeEvent", true).should.throw Error, DecoratorObservable.ERROR_WRONG_ARGUMENT
        
        # removeEventListener
        it 'Should implement the removeEventListener method', -> dObservable.should.respondTo "removeEventListener"
        it 'Should throw an error when removeEventListener is missing an event type', ->
            dObservable.removeEventListener.bind(undefined).should.throw Error, DecoratorObservable.ERROR_MISSING_ARGUMENT
        it 'Should throw an error when removeEventListener has the wrong type as event type', ->
            dObservable.removeEventListener.bind(undefined, true).should.throw Error, DecoratorObservable.ERROR_WRONG_ARGUMENT
        it 'Should throw an error when removeEventListener is missing a callback', ->
            dObservable.removeEventListener.bind(undefined, "SomeEvent").should.throw Error, DecoratorObservable.ERROR_MISSING_ARGUMENT
        it 'Should throw an error when removeEventListener has the wrong type as callback', ->
            dObservable.removeEventListener.bind(undefined, "SomeEvent", true).should.throw Error, DecoratorObservable.ERROR_WRONG_ARGUMENT
        
        # hasEventListener
        it 'Should implement the hasEventListener method', -> dObservable.should.respondTo "hasEventListener"
        it 'Should throw an error when hasEventListener is missing an event type', ->
            dObservable.hasEventListener.bind(undefined).should.throw Error, DecoratorObservable.ERROR_MISSING_ARGUMENT
        it 'Should throw an error when removeEventListenerOf has the wrong type as event type', ->
            dObservable.hasEventListener.bind(undefined, true).should.throw Error, DecoratorObservable.ERROR_WRONG_ARGUMENT
        it 'Should throw an error when removeEventListenerOf is missing a callback', ->
            dObservable.hasEventListener.bind(undefined, "SomeEvent").should.throw Error, DecoratorObservable.ERROR_MISSING_ARGUMENT
        it 'Should throw an error when removeEventListenerOf has the wrong type as callback', ->
            dObservable.hasEventListener.bind(undefined, "SomeEvent", true).should.throw Error, DecoratorObservable.ERROR_WRONG_ARGUMENT
        
        # dispatchEvent
        it 'Should implement the dispatchEvent method', -> dObservable.should.respondTo "dispatchEvent"
        it 'Should throw an error when dispatchEvent is missing an event type', ->
            dObservable.dispatchEvent.bind(undefined).should.throw Error, DecoratorObservable.ERROR_MISSING_ARGUMENT
        it 'Should throw an error when dispatchEvent has the wrong type as event type', ->
            dObservable.dispatchEvent.bind(undefined, true).should.throw Error, DecoratorObservable.ERROR_WRONG_ARGUMENT
        
        # Actual event pattern
        it 'Should respond to the listener after the dispatch', (done)->
            data        = {}
            dObservable.addEventListener "An event", (event) ->
                event.should.be.equal data
                done()
            dObservable.dispatchEvent "An event", data
        
        it 'Should not have a listener after the remove', ->
            data        = {}
            calback     = ->
            dObservable.addEventListener "An event", calback
            dObservable.removeEventListener "An event", calback
            dObservable.hasEventListener("An event", calback).should.not.be.equal(true)
        
        it 'Should have the first listener replyed to last', (done) ->
            counter = 0
            dObservable.addEventListener "Another event", ->
                counter.should.be.least(3)
                done()
            dObservable.addEventListener "Another event",( -> counter++), 1
            dObservable.addEventListener "Another event",( -> counter++), 2
            dObservable.addEventListener "Another event",( -> counter++), 3
            dObservable.dispatchEvent "Another event", ''
