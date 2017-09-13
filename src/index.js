import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import './index.css';
import App from './components/App';
import Category from './components/CategoryView'
import PostView from './components/PostView'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<BrowserRouter>
				<div>
					<Route exact path="/" component={App} />
					<Route exact path="/:selectCategory" component={Category} />
					<Route exact path="/:selectCategory/:postId" component={PostView} />
				</div>
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
