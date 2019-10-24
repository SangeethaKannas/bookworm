import React from 'react'
import { PropTypes } from "prop-types"
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'
import { validateToken } from '../../actions/Auth'

class ResetPasswordPage extends React.Component {
    state = {
        loading: true,
        success: false
    }

    componentDidMount() {
        this.props.validateToken(this.props.match.params.token)
    }

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
    match: PropTypes.shape({
        params: PropTypes.shape({
           token: PropTypes.string.isRequired
        })
    })
}

export default connect(null, validateToken)(ResetPasswordPage)  