import React from 'react'
import { Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import ForgotPasswordForm from '../forms/ForgotPasswordForm'

class ForgotPasswordPage extends React.Component {
   state = {
       success: false
   }

   submit= (data) => 
    this.props.resetPasswordRequest(data)
    .then(() => this.setState({success: true}))
    // .catch(() => this.setState({}))

   render() {
       return (
        <div>
            { this.state.success ? <Message>Email has been sent</Message>:
                <ForgotPasswordForm submit={this.submit} >
                </ForgotPasswordForm>
            }        
        </div>
       )
   }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
}

export default ForgotPasswordPage