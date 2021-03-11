import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad',type:'Salad'},
    {label:'Bacon',type:'Bacon'},
    {label:'Meat',type:'Meat'},
    {label:'Cheese',type:'Cheese'},
]

const buildcontrols=props=>(
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl key={ctrl.label} 
            label={ctrl.label}
            added={()=>(props.ingredient_added(ctrl.type))}
            removed={()=>(props.ingredient_removed(ctrl.type))}
            disabled={props.disabled[ctrl.type]}
            />          
        ))}
        <button
         className={classes.OrderButton}
         disabled={!props.purchasable}
         onClick={props.ordered}>
        {props.isAuth?'ORDER NOW':'SignUp To Order'}</button>
    </div>
)

export default buildcontrols;