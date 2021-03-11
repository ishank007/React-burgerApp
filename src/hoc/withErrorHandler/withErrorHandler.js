import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler =(Wrappedcomponent,axios)=>{
    return class extends Component{

            state={error:null}

            componentWillMount(){
                this.reqinterceptors=axios.interceptors.request.use(request=>{
                    this.setState({error:null});
                    return request;
                })
                this.resinterceptors=axios.interceptors.response.use(response =>response,error=>{
                    this.setState({error:error})
                })
            }
            componentWillUnmount(){
                axios.interceptors.request.eject(this.reqinterceptors);
                axios.interceptors.response.eject(this.resinterceptors);
            }

            errorConfrmedHandler=()=>{
                this.setState({error:null});
            }

            render(){
                    return(
                        <Aux>
                            <Modal show={this.state.error}
                                modalClosed={this.errorConfrmedHandler}>
                                {this.state.error?this.state.error.message:null}
                            </Modal>
                            <Wrappedcomponent {...this.props}/>
                        </Aux>
                    )
                }
             }
    }

export default withErrorHandler;