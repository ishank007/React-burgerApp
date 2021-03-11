import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact links={'/'} active>Burger Builder</NavigationItem>
        {props.isAuthenticated?<NavigationItem links={'/orders'}>Orders</NavigationItem>:null}
        {props.isAuthenticated?<NavigationItem links={'/logout'}>Logout</NavigationItem>
        :<NavigationItem links={'/auth'}>Authenticate</NavigationItem>
        }
        
    </ul>
);

export default navigationItems;