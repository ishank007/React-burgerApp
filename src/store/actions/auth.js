import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authstart=()=>{
    return{
        type:actionTypes.AUTH_START   
    }
}
export const authsuccess=(IdToken,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        IdToken:IdToken,
        userId:userId
    }
}
export const authfail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error 
    }
}
export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthlogout=(expirationtime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationtime*1000);
    }
}
export const auth=(email,password,iSsignUp)=>{
    return dispatch=>{
        dispatch(authstart());  
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD9YfYSXhQlKS3HnRpdb7Z_6g78zgh9LVk';
        if(!iSsignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD9YfYSXhQlKS3HnRpdb7Z_6g78zgh9LVk';

        }
        axios.post(url,authData)
            .then(response=>{
                // console.log(response)
                const expirationDate=new Date(new Date().getTime()+ response.data.expiresIn*1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId',response.data.localId);
                dispatch(authsuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthlogout(response.data.expiresIn));

            })
            .catch(err=>{
                // console.log(err)
                dispatch(authfail(err.response.data.error))
            })
    }
}
export const SetAuthRedirectpath=(path)=>{
    return{
        type:actionTypes.AUTH_REDIRECTPATH,
        path:path
    }
}

export const checkAuthstate=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){dispatch(logout());}
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                const userId=localStorage.getItem('userId');
                dispatch(authsuccess(token,userId));
                dispatch(checkAuthlogout((expirationDate.getTime()-new Date().getTime())/1000));
            }
        }
    }
}