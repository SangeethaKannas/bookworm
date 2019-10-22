import React from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage'
import NewBookPage from './NewBookPage'

const DashboardPage = ({ isConfirmed }) => (
    <div>
        {!isConfirmed && <ConfirmEmailMessage /> }
        <NewBookPage />
    </div>
 )

 DashboardPage.propTypes = {
     isConfirmed: PropTypes.bool.isRequired
 }

function mapStateToProps(state) {
    return {
        isConfirmed: !!state.user.confirmed
    }
}

export default connect(mapStateToProps)(DashboardPage)