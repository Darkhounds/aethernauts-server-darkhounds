strictArguments     = require("../decorator/strictArguments");

var _constructor    = strictArguments.extend(function()                     {
    /*Decorator Observable*/
    throw new Error(_constructor.ERROR_CANNOT_INSTANTIATE_DECORATOR_CLASS);
});
Object.defineProperty(_constructor, 'toString', {value: function(){ return 'Decorator Observable'; }});
Object.defineProperty(_constructor, '_listeners', {enumerable: true, writable: true, value: null});
Object.defineProperty(_constructor, 'getListeners', {enumerable: true, value: function(){
    if (!this._listeners) this._listeners = {};
    return this._listeners;
}});

Object.defineProperty(_constructor, 'addEventListener', {enumerable: true, value: function(type, callback, priority){
    if (!type) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof type !== 'string' ) throw new Error(_constructor.ERROR_WRONG_ARGUMENT);
    if (!callback) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof callback !== 'function') throw new Error(_constructor.ERROR_WRONG_ARGUMENT);
    
    var listeners = this.getListeners();
    if (!listeners[type]) listeners[type] = [];
    
    var index = indexOfByProperty(listeners[type], 'callback', callback);
    
    if (index < 0) listeners[type].push({callback:callback, priority: priority || 0});
    else listeners[type][index].priority = priority;
    listeners[type].sort(function(a, b){return b.priority - a.priority})
}});

Object.defineProperty(_constructor, 'removeEventListener', {enumerable: true, value: function(type, callback){
    if (!type) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof type !== 'string' ) throw new Error(_constructor.ERROR_WRONG_ARGUMENT);
    if (!callback) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof callback !== 'function') throw new Error(_constructor.ERROR_WRONG_ARGUMENT);

    var listeners = this.getListeners();
    if (!listeners[type] || !listeners[type].length) return;

    var index = indexOfByProperty(listeners[type], 'callback', callback);
    listeners[type].splice(index, 1);
}});

Object.defineProperty(_constructor, 'hasEventListener', {enumerable: true, value: function(type, callback){
    if (!type) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof type !== 'string' ) throw new Error(_constructor.ERROR_WRONG_ARGUMENT);
    if (!callback) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof callback !== 'function') throw new Error(_constructor.ERROR_WRONG_ARGUMENT);

    var listeners = this.getListeners();
    if (!listeners[type] || !listeners[type].length) return false;

    var index = indexOfByProperty(listeners[type], 'callback', callback);
    return (index < 0)?false:true;
    
}});

Object.defineProperty(_constructor, 'dispatchEvent', {enumerable: true, value: function(type, event){
    if (!type) throw new Error(_constructor.ERROR_MISSING_ARGUMENT);
    if (typeof type !== 'string' ) throw new Error(_constructor.ERROR_WRONG_ARGUMENT);

    var listeners = this.getListeners();
    if (!listeners[type]) return;

    for (var i in listeners[type]) listeners[type][i].callback(event);
}});

function indexOfByProperty(array, property, value) {
    for (var i = 0; i < array.length; i++ ) {
        var item = array[i] || {};
        if (item[property] === value) return i
    }
    return -1
}


module.exports      = _constructor;
