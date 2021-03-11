import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './Contact.css';
import Spinner from  '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import {ValidityHandler} from '../../../shared/utility';

class ContactData extends Component{
    state={
        orderform:{
            name:{
                elementType:'input',
                elementConfig:{type:'text',placeholder:'Your Name'},
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{type:'text',placeholder:'Street'},
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType:'input',
                elementConfig:{type:'text',placeholder:'ZIP Code'},
                value:'',
                validity:{
                    required:true,
                    minLength: 6,
                    maxLength: 6
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{type:'text',placeholder:'Country'},
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{type:'email',placeholder:'Your E-mail'},
                value:'',
                validity:{
                    required:true
                },
                valid:false,
                touched:false
            },
            delivery_method:{
                elementType:'select',
                elementConfig:{
                    options:[{value:'fastest', displayValue:'Fastest'},
                             {value:'normal', displayValue:'Normal'},
                             {value:'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value:'',
                validity:{
                    required:true
                },
                valid:true,
                touched:false
            },
        },
        formIsvalid:false
    }
    orderhandler=(event)=>{
        event.preventDefault();
        // console.log(this.props.ingredients);
        //  this.setState({loading:true})
         const formData={};
         for(let k in this.state.orderform){
             formData[k]=this.state.orderform[k].value;
         }
        const order={
            ingredients:this.props.ing,
            totalPrice:this.props.price,
            orderData:formData,
            userId:this.props.userId
        }
        this.props.onaddburger(order,this.props.token);
    }

    inputchangehandler=(event,inputIdentifier)=>{
        // console.log(event.target.value);
        const updatedForm={
            ...this.state.orderform
        }
        const updatedFormelement={...updatedForm[inputIdentifier]}
        updatedFormelement.value=event.target.value
        updatedFormelement.valid=ValidityHandler(updatedFormelement.value,updatedFormelement.validity)
        updatedFormelement.touched =true;
        // console.log(updatedFormelement);
        let formIsvalid=true;
        for(let inputidentifier in updatedForm){
            formIsvalid=updatedForm[inputidentifier].valid && formIsvalid;
        }
        updatedForm[inputIdentifier]=updatedFormelement;
        this.setState({orderform:updatedForm,formIsvalid:formIsvalid});
    }

    render(){
        let formElementArray=[];
        for(let k in this.state.orderform){
            formElementArray.push({
                id:k,
                config:this.state.orderform[k]  //config is basically storing the right side js object
            });
        }

        let form=(
                <form onSubmit={this.orderhandler}>
                    {formElementArray.map(i=>{
                        return(
                            <Input 
                            key={i.id}
                            elementType={i.config.elementType}
                            elementConfig={i.config.elementConfig}
                            invalid={!i.config.valid}
                            Shouldvalidate={i.config.validity}
                            touched={i.config.touched}
                            value={i.config.value}
                            changed={(event)=>this.inputchangehandler(event,i.id)}
                            />
                        )
                    })}
                    <Button btnType='Success' disabled={!this.state.formIsvalid}>ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.total_prices,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToprops=(dispatch)=>{
    return{
        onaddburger:(orderData,token)=>dispatch(actions.purchaseburger(orderData,token))
    } 
}
export default connect(mapStateToProps,mapDispatchToprops)(withErrorHandler(ContactData,axios));