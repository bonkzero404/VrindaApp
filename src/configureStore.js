/* eslint import/no-extraneous-dependencies: 0 */
/* eslint global-require: 0 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import createHistory from 'history/createMemoryHistory';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducers';

export const history = createHistory();

export default function configureStore() : any {
  const middleware = routerMiddleware(history);
  const enhancer = composeWithDevTools({})(applyMiddleware(thunk, middleware));
  const store = createStore(reducer, enhancer);
  const persistor = persistStore(store);
  // persistor.purge();
  if (module.hot) {
    module
      .hot
      .accept(() => {
        store.replaceReducer(require('./reducers').default);
      });
  }

  return { persistor, store };
}
