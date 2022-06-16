import { hot } from 'jasmine-marbles';
import { setInfo } from '../actions/util';
import { Entity } from '../decorators/entity-decorator';
import { Key } from '../decorators/key-decorator';
import { makeEntity } from '../util/make-entity';
import { logAndThrow, logErrorDetails, logServiceLocateFailure, notAFunction, notImplemented } from './error-handling';

@Entity({
  modelName: 'Test'
})
class Test {
  @Key id: number;
  name: string;
}

const makeTestModel = makeEntity(Test);

describe('notImplemented()', () => {
  it('should return an error string about a required service method not being implemented', () => {
    const str = notImplemented('loadAll', setInfo(Test));
    expect(str).toBe(`Entity service method "loadAll" has not been implemented. (Entity: Test)`);
  });
});

describe('notAFunction()', () => {
  it('should return an error string about a required service method not being a function', () => {
    const str = notAFunction('loadAll', setInfo(Test));
    expect(str).toBe(`Entity service method "loadAll" is not a function. (Entity: Test)`);
  });
});

describe('logAndThrow()', () => {
  it('should console log a service error, the error object, and throw a new error', () => {
    jest.spyOn(console, 'error');
    const info = setInfo(Test);
    const err = new Error('404 Not Found');

    const obs = logAndThrow('loadAll', err, info);

    expect(obs).toBeObservable(hot('#', {}, { info, err }));

    expect(console.error).toHaveBeenNthCalledWith(1, '[NGRX-AE] ! Service error: loadAll(). (Entity: Test)');
    expect(console.error).toHaveBeenNthCalledWith(2, err);
  });
});

describe('logServiceLocateFailure()', () => {
  it('should console log an error about locating the correct entity service for the given entity', () => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error');
    logServiceLocateFailure(setInfo(Test));
    expect(console.error).toHaveBeenCalledWith('[NGRX-AE] ! Error: Unable to locate entity service for model "Test"');
  });
});

describe('logErrorDetails()', () => {
  it('should console log the details of the given error', () => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error');
    const error = new Error('A Test error');
    logErrorDetails(error);
    expect(console.error).toHaveBeenCalledWith('[NGRX-AE] ! Error Details:', error);
  });
});
