import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import{connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';
import {ValidityHandler} from '../../shared/utility';

class Auth extends Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{type:'email',placeholder:'Email Address'},
                value:'',
                validity:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{type:'password',placeholder:'Password'},
                value:'',
                validity:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },issignup:true
    }

    switchAuthHandler=()=>{
            this.setState(prevState=>{
                return{
                    issignup:!prevState.issignup
                }
            })
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectpath!=='/'){
            this.props.OnsetRedirectpath();
        }
    }

    inputchangehandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: ValidityHandler(event.target.value, this.state.controls[controlName].validity),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }
    submithandler=(event)=>{
        event.preventDefault();
        this.props.OnAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.issignup);
    }
    render(){
        let formElementArray=[];
        for(let k in this.state.controls){
            formElementArray.push({
                id:k,
                config:this.state.controls[k]  //config is basically storing the right side js object
            });
        }

        let form=formElementArray.map(i=>{
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
                    })
        if(this.props.loading){
            form=<Spinner/>
        }
        let errormessage=null;
        if(this.props.error){
            errormessage=(<p>{this.props.error.message}</p>)
        }
        let authredirect=null;
        if(this.props.isAuthenticated){
            authredirect=<Redirect to ={this.props.authRedirectpath}/>
        }
        
        return(
            <div className={classes.Auth}>
                {authredirect}
                {errormessage}
                <form onSubmit={this.submithandler}>  
                {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button btnType="Danger"
                    clicked={this.switchAuthHandler}
                >Switch To {!this.state.issignup?'SignUp': "Sign In"}</Button>
            </div>
        )
    }
}

const mapStateToprops=state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingburger:state.burgerBuilder.building,
        authRedirectpath:state.auth.authRedirectpath
    }
}
    
const mapDispatchToprops=(dispatch)=>{
    return{
        OnAuth :(email,password,issignup)=>dispatch(actions.auth(email,password,issignup)),
        OnsetRedirectpath:()=>dispatch(actions.SetAuthRedirectpath('/'))
    }
}
export default connect(mapStateToprops,mapDispatchToprops)(Auth);