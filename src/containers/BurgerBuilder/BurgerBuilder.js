import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'; 
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from  '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import{connect} from 'react-redux';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component{
    state={
        purchasing:false,
        loading:false
    }
    componentDidMount(){
      this.props.onInitIngredient();
    }
    updatepurchase=(ingredient)=>{
        let s=0;
        for(let k in ingredient){
            s=s+ingredient[k];
        }
        // this.setState({purchasable:s>0});
        return s>0;
    }

    purchasingHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }
        else{
            this.props.OnSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
       
    }
    purchasingCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchasingContinueHandler=()=>{
       this.props.onInitpurchase();
        this.props.history.push('/checkout');
    }
    render(){
        const disabledInfo={
            ...this.props.ing
        }
        for(let key in disabledInfo){
            // if(disabledInfo[key]<=0){
                disabledInfo[key]=disabledInfo[key]<=0;
            // }
        }
        let ordersummary=null;
        let burger=this.props.error?<p>Ingredients Cant be loaded</p>:<Spinner/>

        if(this.props.ing){
            burger=(
            <Aux>
                <Burger ingredients={this.props.ing}/>
                <BuildControls 
                ingredient_added={this.props.OnAddingredient}
                ingredient_removed={this.props.OnRemoveingredient}
                disabled={disabledInfo}
                price={this.props.price}
                purchasable={this.updatepurchase(this.props.ing)}
                ordered={this.purchasingHandler}
                isAuth={this.props.isAuthenticated}
                />
            </Aux>
            )
            ordersummary=<OrderSummary ingredients={this.props.ing}
                        cancelbutton={this.purchasingCancelHandler}
                        continuebutton={this.purchasingContinueHandler}
                        price={this.props.price}
            />
        }
        if(this.state.loading){
            ordersummary=<Spinner/>
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                {ordersummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.total_prices,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token!==null
    }
}

const mapDispatchToprops=(dispatch)=>{
    return{
        OnAddingredient :(ingName)=>dispatch(actions.addingredients(ingName)),
        OnRemoveingredient :(ingName)=>dispatch(actions.removeingredients(ingName)),
        onInitIngredient :()=>dispatch(actions.initIngredients()),
        onInitpurchase:()=>dispatch(actions.purchaseinit()),
        OnSetAuthRedirect:(path)=>dispatch(actions.SetAuthRedirectpath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(withErrorHandler(BurgerBuilder,axios));