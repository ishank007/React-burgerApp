import * as actiontypes from '../actions/actionTypes';

const initialstate={
    ingredients:null,
    total_prices:4,
    error:false,
    building :false
}

const INGREDIENT_PRICES={
    Salad:0.5,
    Cheese:0.4,
    Meat:1.3,
    Bacon:0.7
}
const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case actiontypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                total_prices:state.total_prices+INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case actiontypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                total_prices:state.total_prices-INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case actiontypes.SET_INGREDIENT:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
                total_prices:4,
                building:false
            }
        case actiontypes.FETCH_INGREDIENTS_FAILED:
            return{
                error:true
            }
        default:
            return state;
    }
}

export default reducer;
