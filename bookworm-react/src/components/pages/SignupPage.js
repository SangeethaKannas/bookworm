import React from 'react'
import SignupForm from '../forms/SignupForm'

class SignupPage extends React.Component {
    submit = data => 
    this.props.signup(data).then(() => this.props.history.push("/dashboard"))

    render() {
        return (<div>
            <SignupForm submit={this.submit} />
        </div>)
    }

}

export default SignupPage