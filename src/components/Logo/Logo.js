import React from 'react';
import classes from './Logo.css';
import BurgerLogo from '../../assets/images/burgerlogo.png';

const logo=props=>(
    <div className={classes.Logo} >
        <img src={BurgerLogo} alt='myburger'/>
    </div>
    
);

export default logo;