import React from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { validateToken, resetPassword } from '../../actions/Auth'
import ResetPasswordForm from '../forms/ResetPasswordForm'

class ResetPasswordPage extends React.Component {
    state = {
        loading: true,
        success: false
    }

    componentDidMount() {
        this.props.validateToken(this.props.match.params.token)
        .then(() => this.setState({loading: false, success: true}))
        .catch(() => this.setState({loading: false, success: false}))
    }

    submit = data => this.props.resetPassword(data).then(() => { 
        console.log(data)
        console.log('Redirecting')
        this.props.history.push("/login") 
    }).catch(error => {
        console.log(error)
    })

    render() {
        const { loading, success} = this.state
        const token = this.props.match.params.token

        return (
            <div>
                {loading && <Message >Loading</Message>}
                {!loading && success && <ResetPasswordForm submit={this.submit} token={token} />}
                {!loading && !success && <Message>Invalid Token</Message>}
            </div>
        )
    }
}

ResetPasswordPage.propTypes = {
    validateToken : PropTypes.func.isRequired,
    resetPassword : PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
           token: PropTypes.string.isRequired
        })
    })
}

export default connect(null, { validateToken, resetPassword } )(ResetPasswordPage) 