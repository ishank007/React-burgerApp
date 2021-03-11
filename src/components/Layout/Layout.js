import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'; 
import {connect} from 'react-redux';

class Layout extends Component{
    state={
        ShowSidedrawer:false
    }
    ClosesidedrawerHandler=()=>{
        this.setState({ShowSidedrawer:false});
    }
    Sidedrawertogglehandler=()=>{
        this.setState((prevState)=>{
          return {ShowSidedrawer:!prevState.ShowSidedrawer}
        });
    }
    render(){
        return (
            <Aux>
                <Toolbar 
                togglehandler={this.Sidedrawertogglehandler}
                isAuth={this.props.isAuthenticated}
                />
                <SideDrawer 
                 isAuth={this.props.isAuthenticated}
                open={this.state.ShowSidedrawer}
                closed={this.ClosesidedrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout);