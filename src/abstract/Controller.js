var Error           = require('../generic/Error');
var StrictArguments = require("./StrictArguments");
var Observable      = require('./Observable');

var decorator       = function(target) {
    if (this instanceof decorator) throw new Error(decorator.ERROR_DECORATOR_NOT_INSTANTIABLE, 'The Controller cant\' be instantiated');
    Observable(target);
    //
    return target;
};

module.exports = StrictArguments(decorator);
