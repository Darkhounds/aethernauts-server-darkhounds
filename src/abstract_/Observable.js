var Error           = require('../generic/Error');
var Utils           = require('../generic/Utils');
var StrictArguments = require("./StrictArguments");
var Decorator       = require('./Decorator');

var decorator       = function(target) {
    if (this instanceof decorator) throw new Error(decorator.ERROR_DECORATOR_NOT_INSTANTIABLE, 'The Observable cant\' be instantiated');
    Decorator(target);
    //
    var _listener = {};
    
    Object.defineProperty(target, 'addEventListener', {enumerable: true, value:
        function(trigger, listener, priority){
            decorator.checkArguments(arguments, 2, 'string', 'function')
            //
            _listener[trigger] = _listener[trigger] || [];
            var index   = Utils.getIndexFromByProperty(_listener[trigger], 'listener', listener);
            if (index < 0) _listener[trigger].push({
                listener: listener,
                priority: priority || 0
            }); else _listener[trigger][index].priority = priority || 0;
            _listener[trigger].sort(function(a, b) { return b.priority - a.priority });
        }
    });
    
    Object.defineProperty(target, 'removeEventListener', {enumerable: true, value:
        function(trigger, listener){
            decorator.checkArguments(arguments, 2, 'string', 'function')
            if (!_listener[trigger]) return;
            //
            var index   = Utils.getIndexFromByProperty(_listener[trigger], 'listener', listener);
            if (index < 0) return;
            //
            _listener[trigger].splice(index, 1);
        }
    });
    
    Object.defineProperty(target, 'dispatchEvent', {enumerable: true, value:
        function(trigger, event){
            decorator.checkArguments(arguments, 1, 'string');
            if (!_listener[trigger] || !_listener[trigger].length) return;
            //
            for (var i in _listener[trigger]) _listener[trigger][i].listener(event, i, _listener[trigger][i].priority);
        }
    });
    
    return target;
};

module.exports      = StrictArguments(decorator);

