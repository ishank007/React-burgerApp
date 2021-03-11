import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const  addingredients=name=>{
    return{
        type:actionTypes.ADD_INGREDIENT
        ,ingredientName:name
    }
}
export const  removeingredients=name=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT
        ,ingredientName:name
    }
}
export const SetIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}

export const FetchIngredFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients=()=>{
    return dispatch=>{
        axios.get('https://react-burger007-9dc66-default-rtdb.firebaseio.com/ingredient.json')
            .then(response=>{
                dispatch(SetIngredients(response.data));
            })
            .catch(error=>{
                dispatch(FetchIngredFailed());
            })
    }
}