import { React } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopNavigation = () => (

    <Menu secondary pointing>
        <Menu.item as={Link} to="/dashboard"> Dashboard</Menu.item>
        <Menu.Menu position="right">
            <Dropdown>
Hi
            </Dropdown>
        </Menu.Menu>
    </Menu>
)

export default TopNavigation