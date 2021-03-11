import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Redirect, Route} from 'react-router-dom';
import ContactData from './ContactData/Contact';
import { connect } from 'react-redux';

class Checkout extends Component{
   
    cancelhandler=()=>{
        this.props.history.goBack();
    }
    continuehandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary=<Redirect to='/'/>
        if(this.props.ing){
            const purchasedRedirect=this.props.purchased?<Redirect to='/'/>:null;
            summary=(
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                    ingredients={this.props.ing} 
                    checkoutcancel={this.cancelhandler}
                    checkoutcontinue={this.continuehandler}/>
                    <Route 
                        path={this.props.match.path +'/contact-data'} 
                        component={ContactData}
                    />
                </div>
            )
        }
        return summary;
    }
}
const mapStateToProps=state=>{
    return{
        ing:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);