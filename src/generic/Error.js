var constructor = function(code, message, data) {
    if (!(this instanceof constructor)) return new constructor(code, message);
    //
    Object.defineProperty(this, 'code',     {enumerable: true, value: code});
    Object.defineProperty(this, 'message',  {enumerable: true, value: message});
    //
    return this
};
//
module.exports  = constructor;