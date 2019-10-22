import React from 'react'
import { Form, Button, Label, Message } from "semantic-ui-react";
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import PropTypes from "prop-types";
import InlineError from '../messages/InlineError'
import { resetPasswordRequest } from '../../actions/Auth'

class ForgotPasswordForm extends React.Component {

    state = {
        data: {
            email: ''
        },
        loading: false,
        errors: {}        
    }

    onChange = e => this.setState({
        ...this.setState,
        data: {...this.state.data, [e.target.name] :e.target.value }
    })

    onSubmit = e => {
        e.preventDefault()
        const errors = this.validate(this.state.data)
        this.setState({ errors })
        if(Object.keys(errors).length === 0) {
            this.setState({loading: true})
            this.props
                .submit(this.state.data)
                .catch(error=> 
                    this.setState({errors: error.response.data.errors, loading : false}  ))
        } else {

        }
    }

    validate = data => {
        const errors = {}
        if(!isEmail(data.email)) errors.email = 'Invalid Email'
        return errors
    }

    render() {
        const {errors, data, loading } = this.state

        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {!!errors.global && <Message negative>{errors.global}</Message>}
                <Form.Field error={!!errors.email}>
                <Label htmlFor="email">Email</Label>
                    <input type="email"
                    id="email"
                    name="email"
                    placehodler="email"
                    value={data.email}
                    onChange={this.onChange} 
                    />                    
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>
                <Button primary>Forgot Password</Button>
            </Form>
        )
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordForm)