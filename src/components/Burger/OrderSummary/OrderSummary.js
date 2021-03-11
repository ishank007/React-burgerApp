import React from 'react';
import Aux from '../../../hoc/Auxiliary'; 
import Button from '../../UI/Button/Button';

const ordersummary=props=>{
    const ordersummary=Object.keys(props.ingredients).map(igkey=>{
        return(
        <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey} :</span> {props.ingredients[igkey]}
        </li>
        );
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious Burger with the following ingredients:</p>
            <ul>
                {ordersummary}
            </ul>
            <p>Checkout to continue?</p>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <Button btnType='Danger' clicked={props.cancelbutton}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continuebutton}>CONTINUE</Button>
        </Aux>
    );
}

export default ordersummary;