var Utils = {};

Object.defineProperty(Utils, 'getIndexFromByProperty', {enumerable: true, value:
    function(list, property, value) {
        for (var i in list) if (list[i][property] === value) return i
    }
});

module.exports = Utils;