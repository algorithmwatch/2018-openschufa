import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import IntlProvider from './components/Intl/IntlProviderContainer';
import 'typeface-roboto';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <IntlProvider>
          <App />
        </IntlProvider>
      </Provider>,
      document.getElementById('root')
    );
  });
}
