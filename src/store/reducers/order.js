import * as actionTypes from '../actions/actionTypes';

const initialstate={
    orders:[],
    loading:false,
    purchased:false
}
const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased:false
            }
        case actionTypes.BURGER_ORDER_START:
            return{
                ...state,
                loading:true
            }
        case actionTypes.BURGER_ORDER_SUCCESS:
            const newOrder={
                ...action.orderData,
                id:action.orderId
            }
            return{
                ...state,
                loading :false,
                purchased:true,
                orders:state.orders.concat(newOrder)
            }
        case actionTypes.BURGER_ORDER_FAIL:
            return{
                ...state,
                loading:false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return{
                ...state,
                loading:true
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return{
                ...state,
                loading:false,
                orders:action.orders
            }
        case actionTypes.FETCH_ORDER_START:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default reducer;