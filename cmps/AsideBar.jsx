
const { NavLink, withRouter } = ReactRouterDOM

export function AsideBar(props) {
    return (
        <nav className="aside-bar flex column align-center">
            <ul className="aside-ul clean-list flex column space-evenely">
                <li>Hilla</li>
                <li>Matan</li>
                <li>Hilla</li>
                <li>Matan</li>
            </ul>
        </nav>
    )
}

