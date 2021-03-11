import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as action from '../../store/actions/index';
import{connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';//THIS HAS SOME ERROR,SO NOT USING IT

class Orders extends Component{
    state={
        loading :true,
        orders:[]
    }
    componentDidMount(){
        this.props.onFetchorder(this.props.token,this.props.userId);
    }
    render(){
        let orders=<Spinner/>
        if(!this.props.loading){
            orders=
                this.props.orders.map(order=>(
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.totalPrice}/>//+is used to convert string to Number in js
                ))
        };
        return(
        <div>
            {orders}
        </div> 
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToprops=(dispatch)=>{
    return{
        onFetchorder:(token,userId)=>dispatch(action.fetchorder(token,userId))
    }
}
export default  connect(mapStateToProps,mapDispatchToprops)(withErrorHandler(Orders,axios));