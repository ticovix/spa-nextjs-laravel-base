import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { isBrowser } from 'utils';
import { sagaMiddleware, runMiddlewares } from 'sagas';
import rootReducer from 'store/ducks';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const persistConfig = {
  key: 'root',
  storage: isBrowser() ? createWebStorage('local') : createNoopStorage(),
};

let composeEnhancers = compose;
if (isBrowser()) {
  composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
const persistor = persistStore(store);

runMiddlewares();

export { store, persistor };
