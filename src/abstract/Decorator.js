var Error           = require('../generic/Error');
var StrictArguments = require('./StrictArguments');
//
var decorator   = function(target) {
    if (this instanceof decorator) throw new Error(decorator.ERROR_DECORATOR_NOT_INSTANTIABLE, 'The Decorator cant\' be instantiated');
    //
    Object.defineProperty(target, 'ERROR_DECORATOR_NOT_INSTANTIABLE', {enumerable: true, value: decorator.ERROR_DECORATOR_NOT_INSTANTIABLE});
    //
    return target;
};
//
Object.defineProperty(decorator, 'ERROR_DECORATOR_NOT_INSTANTIABLE', {enumerable: true, value: 'ErrorDecoratorNotInstantiable'});
//
module.exports      = StrictArguments(decorator);