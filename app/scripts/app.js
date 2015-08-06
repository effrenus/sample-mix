import React from 'react';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as reducers from './reducers/index';
import App from './containers/App';

const redux = createRedux(reducers);

React.render(
	<Provider redux={redux}>
		{() => <App />}
	</Provider>,
	document.getElementById('app'));
