import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderreducer from './store/reducers/order';
import authreducer from './store/reducers/auth';
import thunk from 'redux-thunk';

const rootreducer=combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orderreducer,
    auth:authreducer
});
const composeEnhancers=process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null || compose;

const store=createStore(rootreducer,composeEnhancers(applyMiddleware(thunk)));
const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
