should                      = (require 'chai').should()
#
describe 'The Abstract StrictArguments', ->
    StrictArguments         = require "../../src/abstract/StrictArguments"
    it 'Should be defined',                             -> StrictArguments.should.exist
    #
    describe 'A function decorated by StrictArguments', ->
        decorated               = StrictArguments ->
        it 'Should implement the "ERROR_ARGUMENT_MISSING" property',    -> decorated.should.itself.have.property 'ERROR_ARGUMENT_MISSING'
        it 'Should implement the "ERROR_ARGUMENT_WRONG_TYPE" property', -> decorated.should.itself.have.property 'ERROR_ARGUMENT_WRONG_TYPE'
        it 'Should implement the "checkArguments" method',              -> decorated.should.itself.respondTo 'checkArguments'
