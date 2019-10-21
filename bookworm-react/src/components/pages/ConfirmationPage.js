import { React } from "react";
import { PropTypes } from "prop-types";
import { connect } from 'react-redux'
import { Message, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom'
import { confirm } from '../../actions/Auth'

class ConfirmationPage extends React.Component {
    state = {
        loading: true,
        success: false
    }

    componentDidMount() {
        this.props.confirm(this.props.match.param.token)
        .then(() => this.setState({loading: false, success: true}))
        .catch(()=>this.setState({loading: false, success: false}))
    }

    render() {
        const { loading, success } = this.state

        /**
         * 
         * Email has been sent - spinner
         * Error Message - may be smart - message from server - Invalid Token, Already verified User
         * Link for message re-send
         * 
         */

        return (
            <div>
                {loading && (<Message icon>
                    <Icon name="circle notched" loading></Icon>
                    <Message.Header>Validating your email</Message.Header>
                </Message>)}

                {!loading && success && (
                    <Message success icon>
                        <Icon name="checkmark" />
                        <Message.content>
                            <Message.Header>Thank You. Your Account has been verified.</Message.Header>
                            <Link to="/dashboard" >Go to your Dashboard</Link>
                        </Message.content>
                    </Message>
                )}
                    
                {!loading && !success && (
                    <Message warning>
                        <Icon name="warning sign"    />
                        <Message.Content>
                            <Message.Header>Oooops. Invalid token it seems</Message.Header>                            
                        </Message.Content>
                 </Message>
                )}
            </div>
        )
    }

}

ConfirmationPage.propTypes = {
     confirm: PropTypes.func.isRequired,
     match: PropTypes.shape({
         params: PropTypes.shape({
            token: PropTypes.string.isRequired
         })
     })
}

export default connect(null, {confirm})(ConfirmationPage)