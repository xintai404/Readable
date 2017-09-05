import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();