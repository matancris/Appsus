
const { NavLink, withRouter } = ReactRouterDOM

function _NavBar(props) {
    function goBack() {
        props.history.goBack()
    }



    return (
        <nav className="main-nav flex space-between">
            <div className="logo">AppSus<span></span></div>
            <div className="nav-links flex space-around">

                <NavLink exact to="/"><i className="fas fa-home"></i> </NavLink>
                {/* <NavLink exact to="/">Home</NavLink> */}
                <NavLink to="/keep"><i className="far fa-sticky-note"></i> </NavLink>
                {/* <NavLink to="/keep">Keep </NavLink> */}
                {/* <NavLink to="/mail">Mail </NavLink> */}
                <NavLink to="/mail"><i className="fas fa-envelope"></i></NavLink>
                <NavLink to="/book"><i className="fas fa-book"></i></NavLink>
                {/* <NavLink to="/book">Books </NavLink> */}
            </div>
        </nav>
    )
}

export const NavBar = withRouter(_NavBar)