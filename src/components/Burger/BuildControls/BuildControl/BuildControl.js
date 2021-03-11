import React from 'react';
import classes from './BuildControl.css'
const buildcontrol=props=>(
    <div className={classes.BuildControl}>
        <div classes={classes.Label}>{props.label}</div>
        <button classes={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
        <button classes={classes.More} onClick={props.added}>More</button>
    </div>
)
    


export default buildcontrol;