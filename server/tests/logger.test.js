const winston = require('winston');
const Logger = require('../src/utils/logger');

describe('Logger', () => {
    beforeEach(() => {
        jest.spyOn(winston, 'createLogger').mockReturnValue({
            log: jest.fn(),
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should log trace message', () => {
        const logSpy = jest.spyOn(Logger.logger, 'log');
        Logger.trace('Trace message');
        expect(logSpy).toHaveBeenCalledWith('trace', 'Trace message', undefined);
    });

    test('should log debug message', () => {
        const debugSpy = jest.spyOn(Logger.logger, 'debug');
        Logger.debug('Debug message');
        expect(debugSpy).toHaveBeenCalledWith('Debug message', undefined);
    });

    test('should log info message', () => {
        const infoSpy = jest.spyOn(Logger.logger, 'info');
        Logger.info('Info message');
        expect(infoSpy).toHaveBeenCalledWith('Info message', undefined);
    });

    test('should log warn message', () => {
        const warnSpy = jest.spyOn(Logger.logger, 'warn');
        Logger.warn('Warning message');
        expect(warnSpy).toHaveBeenCalledWith('Warning message', undefined);
    });

    test('should log error message', () => {
        const errorSpy = jest.spyOn(Logger.logger, 'error');
        Logger.error('Error message');
        expect(errorSpy).toHaveBeenCalledWith('Error message', undefined);
    });

    test('should log fatal message', () => {
        const logSpy = jest.spyOn(Logger.logger, 'log');
        Logger.fatal('Fatal message');
        expect(logSpy).toHaveBeenCalledWith('fatal', 'Fatal message', undefined);
    });
});