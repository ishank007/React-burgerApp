import React from 'react';
import Burger from '../../Burger/Burger';
import  Button from  '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutsummary =props=>{
    return(
    <div className={classes.CheckoutSummary}>
        <h1>Hope it is Delicious!</h1>
        <div style={{width:'100%',margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button
            btnType='Danger'
            clicked={props.checkoutcancel}> 
            CANCEL
        </Button>
        
        <Button
            btnType='Success'            
            clicked={props.checkoutcontinue}>
            CONTINUE
        </Button>
    </div>
    )
}
export default checkoutsummary; 