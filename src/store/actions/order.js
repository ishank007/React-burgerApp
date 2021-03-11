import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseburgersuccess=(id,orderData)=>{
    return{
        type:actionTypes.BURGER_ORDER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseburgerfail=(error)=>{
    return{
        type:actionTypes.BURGER_ORDER_FAIL,
        error:error
    }
}
export const purchaseburgerstart=()=>{
    return{
        type:actionTypes.BURGER_ORDER_START
    }
}

export const purchaseinit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const purchaseburger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseburgerstart());
        axios.post('/orders.json?auth='+token,orderData)
            .then(response=>
                dispatch(purchaseburgersuccess(response.data.name,orderData))
            )
            .catch(error=>
                dispatch(purchaseburgerfail(error))
            )
    }
}

export const fetchordersuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchorderfail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}
export const fetchorderstart=()=>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchorder =(token,userId)=>{
    return dispatch=>{
        dispatch(fetchorderstart());
        const queryParams='?auth='+ token + '&orderBy="userId"&equalTo="'+ userId + '"';
        axios.get('/orders.json'+ queryParams)
            .then(res=>{
                const fetchOrders=[];
                for(let key in res.data){
                    fetchOrders.push({...res.data[key],id:key});
                }
                dispatch(fetchordersuccess(fetchOrders))
                // console.log(res.data);
            })
            .catch(err=>{
                dispatch(fetchorderfail());
            })
    }
}