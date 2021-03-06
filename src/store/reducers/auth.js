import *as actionTypes from '../actions/actionTypes';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectpath:'/'
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return{
                ...state,
                error:null,loading:true
            }
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                loading:false,
                userId:action.userId,
                token:action.IdToken,
                error:null
            }
        case actionTypes.AUTH_FAIL:
            return{
                ...state,
                error:action.error,
                loading:false
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                userId:null,
                token:null
            }
        case actionTypes.AUTH_REDIRECTPATH:
            return{
                ...state,
                authRedirectpath:action.path
            }
        default:
            return state
    }
}

export default  reducer;