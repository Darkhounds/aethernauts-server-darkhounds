strictArguments     = require("../decorator/strictArguments");
observable          = require('../decorator/observable');

var _constructor    = strictArguments.extend(function(driver)                               {
    /*Abstract Model*/
    throw new Error(_constructor.ERROR_CANNOT_INSTANTIATE_DECORATOR_CLASS);
});
Object.defineProperty(_constructor, 'toString', {value: function(){ return 'Asbtract Model'; }});
Object.defineProperty(_constructor, '_driverChanged',   {enumerable:true,   writable:true,     value: function(){ }});
Object.defineProperty(_constructor, '_driver',          {enumerable:true,   writable:true,     value: null });
Object.defineProperty(_constructor, 'getDriver',        {enumerable:true,   value: function(){ return this._driver; }});
Object.defineProperty(_constructor, 'setDriver',        {enumerable:true,   value: function(v){
    if (!v) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof v !== 'object') throw new Error(_constructor.ERROR_WRONG_ARGUMENT);
    if (v == this._driver) return;
    this._driver = v;
    if (typeof this._driverChanged === 'function') this._driverChanged();
}});
module.exports      = _constructor;
