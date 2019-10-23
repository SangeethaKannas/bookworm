import React from 'react'
import { PropTypes } from "prop-types";
import { connect } from 'react-redux'
import { Menu, Dropdown, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import gravatarUrl from 'gravatar-url'
import { logout } from '../../actions/Auth'

const TopNavigation = ({ user, logout }) => (    
    <Menu secondary pointing>
        <Menu.item as={Link} to="/dashboard"> Dashboard</Menu.item>
        <Menu.Menu position="right">
            <Dropdown trigger={ <Image avatar src={gravatarUrl('test@test.com')} />}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Menu>
    </Menu>

)

TopNavigation.propTypes = {
    user: PropTypes.shape ({
        email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired
}


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logout} )(TopNavigation)