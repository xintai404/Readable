import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import './index.css';
import App from './components/App';
import Category from './components/Category'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/category/:selectCategory" component={Category} />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
