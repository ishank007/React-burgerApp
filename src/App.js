import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import {Route,Switch,Redirect} from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as action from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onAutoTrySignup();
  }
  render() {
    let routes=(
      <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={asyncAuth}/>
          <Redirect to='/'/>
      </Switch>
    );
    if(this.props.isAuth){
      routes=(
      <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={asyncAuth}/>
          <Redirect to='/'/>
      </Switch>);
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>        
      </div>
    );
  }
}
const mapStateToprops=state=>{
  return{
    isAuth:state.auth.token!==null
  }
}
const mapDispatchToprops=(dispatch)=>{
  return{
    onAutoTrySignup:()=>dispatch(action.checkAuthstate())
  }
}

export default  connect(mapStateToprops,mapDispatchToprops)(App);
