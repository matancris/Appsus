
const { NavLink, withRouter } = ReactRouterDOM

function _NavBar(props) {
    function goBack() {
        props.history.goBack()
    }



    return (
        <nav className="main-nav flex space-between">
            <div className="logo">AppSus<span></span></div>
            <div className="nav-links flex space-around">
            <NavLink exact to="/">Home </NavLink>
            <NavLink to="/keep">Keep </NavLink>
            <NavLink to="/mail">Mail </NavLink>
            <NavLink to="/book">Books </NavLink>
            </div>
        </nav>
    )
}

export const NavBar = withRouter(_NavBar)