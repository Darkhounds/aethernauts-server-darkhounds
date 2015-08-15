var Error       = require('../generic/Error');
//
var decorator = function(target) {
    if (typeof target !== 'function') return;
    //
    Object.defineProperty(target, 'ERROR_ARGUMENT_MISSING',     {enumerable: true, value: 'ErrorArgumentMissing'});
    Object.defineProperty(target, 'ERROR_ARGUMENT_WRONG_TYPE',  {enumerable: true, value: 'ErrorArgumentWrongType'});

    Object.defineProperty(target, 'checkArguments', {enumerable: true, value: function(arguments, mandatory, rules) {
        if (arguments.length < mandatory) throw new Error(target.ERROR_ARGUMENT_MISSING, 'Mandatory argument count of ' + mandatory + ' not reached!');
        
        for (var i in arguments) {
            if (i >= rules.length) return;
            //
            var argument    = arguments[i];
            var rule        = rules[i];
            //
            if (typeof argument !== rule) throw new Error(target.ERROR_ARGUMENT_WRONG_TYPE, 'Argument ' + i + ' needs to be "' + rule + '"!');
        }
    }});
    //
    return target
};
//
module.exports      = decorator;