import React from 'react'
import { Form, Button, Label, Message } from "semantic-ui-react";
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import InlineError from '../messages/InlineError'

class ResetPasswordForm extends React.Component {
  
    state = {
        data: {
            token: ''
        },
        loading: false,
        errors: {}   
    }

    componentDidMount() {
        this.setState({
            data: {
                token: this.props.token
            }
        })
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
            console.log('No Errors')
            this.props
                .submit(this.state.data)                
                .catch(error=> 
                    this.setState({errors: error.response.data.errors, loading : false}  ))
        } else {

        }
    }

    validate = data => {
        const errors = {}
        
        if(!data) errors.data = 'Passwords cannot be blank'

        if(data.password !== data.passwordConfirmation) {
            errors.password = 'Passwords are not matching'
        }
        return errors
    }

  render() {

      const { errors, data, loading } = this.state

      return (
        <Form onSubmit={this.onSubmit} loading={loading}>
            { !!errors.global && <Message negative>
                <Message.Header>Something went wrong</Message.Header>
                    <p>{errors.global}</p>
                </Message>
            }
            <Form.Field error={!!errors.password}>
                <Label htmlFor="password">New Password</Label>
                <input type="password"
                id="password"
                name="password" 
                placeholder="Your new Password"
                value={data.password}
                onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password}/>}
            </Form.Field>

            <Form.Field error={!!errors.password}>
                <Label htmlFor="passwordConfirmation">Confirm your new Password</Label>
                <input type="password"
                id="passwordConfirmation"
                name="passwordConfirmation" 
                placeholder="Confirm Password"
                value={data.passwordConfirmation}
                onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password}/>}
            </Form.Field>

            <Button primary>Reset</Button>
        </Form>
      )
  }

}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    return {
       token: state.user.token
    }
}

export default connect(mapStateToProps, {})( ResetPasswordForm )