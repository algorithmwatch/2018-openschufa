import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';


export default function configureStore() {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );

  if (process.env.NODE_ENV !== 'production') {
    window.store = store;
    if (module.hot) {
      module.hot.accept('../reducers/rootReducer', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store;
}
