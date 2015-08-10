should      = (require 'chai').should()
#
describe 'The Abstract Decorator', ->
    AbstractDecorator   = require "../abstract/decorator"
    it 'Should be defined',                                 -> should.exist AbstractDecorator
    it 'Should implement the "decorate" method',            -> AbstractDecorator.should.itself.respondTo 'decorate'
    it 'Should implement the "extend" method',              -> AbstractDecorator.should.itself.respondTo 'extend'
    it 'Should throw an error when trying to instantiate',  ->
        AbstractDecorator.bind(undefined).should.throw Error, AbstractDecorator.ERROR_CANNOT_INSTANTIATE_DECORATOR_CLASS
    it 'Should throw an error when trying to decorate without a targt',  ->
        AbstractDecorator.decorate.bind(undefined).should.throw Error, AbstractDecorator.ERROR_DECORATE_TARGET_MISSING
    it 'Should throw an error when trying to decorate a function',  ->
        AbstractDecorator.decorate.bind(undefined,  ->).should.throw Error, AbstractDecorator.ERROR_DECORATE_TARGET_NOT_AN_OBJECT
    it 'Should throw an error when trying to extend withou a taget',  ->
        AbstractDecorator.extend.bind(undefined).should.throw Error, AbstractDecorator.ERROR_EXTEND_TARGET_MISSING
    it 'Should throw an error when trying to extend an object',  ->
        AbstractDecorator.extend.bind(undefined,  {}).should.throw Error, AbstractDecorator.ERROR_EXTEND_TARGET_NOT_A_FUNCTION
    
    describe 'A Decorator', ->
        decorator           = AbstractDecorator.extend ->
        decorator.toString  = -> return "decorator"
        decorator.foo       = -> return 'bar'
        
        # Methods inherited from the decorato during an extend
        it 'Should implement the "decorate" method',            -> decorator.should.itself.respondTo 'decorate'
        it 'Should implement the "extend" method',              -> decorator.should.itself.respondTo 'extend'
        
        describe 'A Decorated object', ->
            decorated = decorator.decorate {
                toString:   -> return "decorated"
            }
            
            # methods ignored from the decorator during a decorate:
            it 'Should not implement the "decorate" method',    -> decorated.should.not.respondTo 'decorate'
            it 'Should not implement the "extend" method',      -> decorated.should.not.respondTo 'extend'
                
            # methods inherited from the decorator during a decorate:
            it 'Should implement the "foo" method',             -> decorated.should.respondTo 'foo'
            it 'Should respond with "bar" to "foo"',            -> decorated.foo().should.be.equal('bar')
        
        describe 'Another Decorated object', ->
            decorated = decorator.decorate {
                toString:   -> return "another decorated"
                hail:       -> return 'Hello World!'
                foo:        -> return 'pub'
            }
            
            it 'Should not implement the "decorate" method',    -> decorated.should.not.respondTo 'decorate'
            it 'Should not implement the "extend" method',      -> decorated.should.not.respondTo 'extend'
            it 'Should implement the "foo" method',             -> decorated.should.respondTo 'foo'
            it 'Should implement the "hail" method',            -> decorated.should.respondTo 'hail'
            
            # Override order during decoration is: decorator > decorated
            it 'Should still respond with "bar" to "foo"',      ->
                decorated.foo().should.be.equal('bar')
                decorated.foo = -> return 'pub'
                it 'Should now respond with "pub" to "foo"',    -> decorated.foo().should.be.equal('pub')