import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Label, Message } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'
import isEmail from 'validator/lib/isEmail'

class SignupForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    onChange = (e) => {
        this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
    }

    validate = (data) => {
        const errors = {}

        if(!data.password) errors.password = "Can't be blank"
        if(!isEmail(data.email)) errors.email = "Can't be blank"
        return errors; 
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data)
        
        this.setState({errors})
        
        if(Object.keys(errors).length === 0) {
            this.setState({ loading: true })
            this.props.submit(this.state.data)
            .catch( error => this.setState({ errors: error.response.data.errors, loading: false }))
        } else {
            //TODO: show global message for errors,   disable login button
            // console.log(errors)        
        }
    }

    render() {
        const { data, errors, loading } = this.state
        
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                { !!errors.global && <Message negative>
                    <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.global}</p>
                    </Message>
                }
                <Form.Field error={!!errors.email}>
                    <Label htmlFor="email">Email</Label>
                    <input type="email"
                    id="email"
                    name="email"
                    placehodler="example@example.com"
                    value={data.email}
                    onChange={this.onChange} 
                    />                    
                    {errors.email && <InlineError text={errors.email}/>}    
                </Form.Field>                
                <Form.Field error={!!errors.email}>
                    <Label htmlFor="password">Password</Label>
                    <input type="password"
                    id="password"
                    name="password" 
                    placeholder="Password"
                    value={data.password}
                    onChange={this.onChange}
                    />
                   
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>                
                <Button primary>Signup</Button>
            </Form>
        )
    }
}

SignupForm.propTypes =  {
    submit : PropTypes.func.isRequired
}

export default SignupForm