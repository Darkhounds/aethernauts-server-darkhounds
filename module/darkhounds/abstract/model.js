strictArguments     = require("../decorator/strictArguments");
observable          = require('../decorator/observable');

var _constructor    = strictArguments.extend(function(driver)                               {
    /*Abstract Model*/
    if (!driver) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof driver !== 'object') throw new Error(_constructor.ERROR_WRONG_ARGUMENT);
    //
    var _driver = driver;
    //
    observable.decorate(this);
    this.getDriver = function() { return _driver; };
    //
    return this;
});
Object.defineProperty(_constructor, 'toString', {value: function(){ return 'Asbtract Model'; }});
module.exports      = _constructor;
