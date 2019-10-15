import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Label } from 'semantic-ui-react'
import InlineError from '../messages/InlineError'

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    }

    validate = (data) => {
        const errors = {}

        if(!data.password) errors.password = "Can't be blank"
        if(!data.email) errors.email = "Can't be blank"
        return errors;  
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data)
        
        this.setState({errors})
        
        if(Object.keys(errors).length === 0) {
            this.props.submit(this.state.data)
        } else {
            //TODO: show global message for errors,   disable login button
            // console.log(errors)        
        }        
    }

    onChange = (e) => {
        this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
    }

    render() {
        const { data, errors } = this.state
        console.log(errors)
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
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
                <Form.Field>
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
                <Button primary>Login</Button>
            </Form>
        )
    }
}

LoginForm.propTypes =  {
    submit : PropTypes.func.isRequired
}

export default LoginForm