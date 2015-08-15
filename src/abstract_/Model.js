var Error           = require('../generic/Error');
var StrictArguments = require("./StrictArguments");
var Observable      = require('./Observable');

var decorator       = function(target) {
    if (this instanceof decorator) throw new Error(decorator.ERROR_DECORATOR_NOT_INSTANTIABLE, 'The Model cant\' be instantiated');
    Observable(target);
    //
    var _driver = null;
    //
    Object.defineProperty(target, '_registerDriver', { writable: true, value: function (driver) {} });
    Object.defineProperty(target, '_unregisterDriver', { writable: true, value: function (driver) {} });
    //
    Object.defineProperty(target, 'setDriver', { enumerable: true, value:
        function (driver) {
            target._unregisterDriver(_driver);
            _driver = driver;
            target._registerDriver(_driver);
        }
    });
    Object.defineProperty(target, 'getDriver', { enumerable: true, value:
        function () { return _driver; }
    });
    //
    return target;
};

module.exports = StrictArguments(decorator);
