module.exports = {
    abstract: {
        StrictArguments:    require('./src/abstract/StrictArguments'),
        Decorator:          require('./src/abstract/Decorator'),
        Observable:         require('./src/abstract/Observable'),
        Model:              require('./src/abstract/Model'),
        Controller:         require('./src/abstract/Controller')
    },
    generic: {
        Error:              require('./src/generic/Error'),
        Utils:              require('./src/generic/Utils')
    }
};