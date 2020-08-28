
const { NavLink, withRouter } = ReactRouterDOM

function _NavBar(props) {
    function goBack() {
        props.history.goBack()
    }

    return (
        <nav className="main-nav">
            <NavLink exact to="/">Home |</NavLink>
            <NavLink to="/book">Books |</NavLink>
            <NavLink to="/about">About </NavLink>
            <button className= "btn-back" onClick={ goBack }>Back</button>
        </nav>
    )
}

export const NavBar = withRouter(_NavBar)