 import React from 'react'
 import { Link} from 'react-router-dom'

 const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <div><Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></div>
    </div>
 )

 export default HomePage