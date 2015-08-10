//var extend          = require('util')._extend;
var debug = false;
//
var _constructor    = function() {
    /* Abstract Decorator*/
    throw new Error(_constructor.ERROR_CANNOT_INSTANTIATE_DECORATOR_CLASS)
};
Object.defineProperty(_constructor, 'toString', {value: function(){ return 'Abstract Decorator' }});
//
Object.defineProperty(_constructor, 'ERROR_CANNOT_INSTANTIATE_DECORATOR_CLASS',
        {enumerable: true, value: 'Cannot instantiate decorator class'});
Object.defineProperty(_constructor, 'ERROR_DECORATE_TARGET_MISSING',
        {enumerable: true, value: 'Decorate Target Missing'});
Object.defineProperty(_constructor, 'ERROR_DECORATE_TARGET_NOT_AN_OBJECT',
        {enumerable: true, value: 'Decorate target not an object'});
Object.defineProperty(_constructor, 'ERROR_DECORATOR_MUST_BE_A_FUNCTION',
        {enumerable: true, value: 'Decorator must be a function'});
Object.defineProperty(_constructor, 'ERROR_EXTEND_TARGET_MISSING',
        {enumerable: true, value: 'Extend target missing'});
Object.defineProperty(_constructor, 'ERROR_EXTEND_TARGET_NOT_A_FUNCTION',
        {enumerable: true, value: 'Extend target not a function'});
//
Object.defineProperty(_constructor, 'decorate', {enumerable: true, value:function(target) {
    if (!target) throw new Error(_constructor.ERROR_DECORATE_TARGET_MISSING);
    if (typeof target !== "object") throw new Error(_constructor.ERROR_DECORATE_TARGET_NOT_AN_OBJECT);
    if (typeof this !== "function") throw new Error(_constructor.ERROR_DECORATOR_MUST_BE_A_FUNCTION);
    //
    if (debug) console.log("--> DECORATE:" + toShortString(target) + ", " + toShortString(this));
    //
    return inject(target, [this], ['decorate', 'extend']);
}});
Object.defineProperty(_constructor, 'extend', {enumerable: true, value:function(target, context){
    if (!target) throw new Error(_constructor.ERROR_EXTEND_TARGET_MISSING);
    if (typeof target !== "function") throw new Error(_constructor.ERROR_EXTEND_TARGET_NOT_A_FUNCTION);
    if (typeof this !== "function") throw new Error(_constructor.ERROR_DECORATOR_MUST_BE_A_FUNCTION);
    //
    if (debug) console.log("--> EXTEND:" + toShortString(target) + ", " + toShortString(this) + ", " + Object.getOwnPropertyNames(this));
    //
    return inject(target, [this], []);
}});
//
function inject(target, sources, filters)                           {
    if(arguments.length < 2) return;
    //
    if (debug) console.log("-----> TARGET: " + toShortString(target) + ", " + Object.getOwnPropertyNames(target).length + ", " + Object.getOwnPropertyNames(target));
    for (var i in sources)                                          {
        var source = sources[i];
        if (debug) console.log("----> SOURCE: " + toShortString(source) + ", " + Object.getOwnPropertyNames(source).length + ", " + Object.getOwnPropertyNames(source));
        if (typeof source === 'function' || typeof source === 'object')
            for (var property in source) if(filters && filters.indexOf(property) < 0) {
                if (debug) console.log("---> " + property + " in " + toShortString(source) + " = " + Object.getOwnPropertyDescriptor(source, property));
                Object.defineProperty(target, property, Object.getOwnPropertyDescriptor(source, property))
            }
    }
    //
    if (debug) console.log("-----> AFTER: " + Object.getOwnPropertyNames(target).length + ", " + Object.getOwnPropertyNames(target)+ "\n");
    return target;
};
//
function toShortString(obj){
    return typeof obj + " "+ (obj?obj.toString().replace(/(?:\r\n|\r|\n|\ \ |function(.*)\((.*)\)|function)/g, '').substr(0, 40):'');
}
//

module.exports  = _constructor;