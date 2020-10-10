import createSagaMiddleware from 'redux-saga';
import sagaAuth from './auth';

const sagaMiddleware = createSagaMiddleware();

function runMiddlewares() {
  sagaMiddleware.run(sagaAuth);
}

export { sagaMiddleware, runMiddlewares };
