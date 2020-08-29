const { Link } = ReactRouterDOM

export class Home extends React.Component {

    render() {
        return (
            <div className="main-home flex justify-center column">
                <div className="title-home text-focus-in">Welcome To AppSus</div>
                <section className="logo-imgs justify-center flex">
                    <Link to={`/mail`}>
                        <div className="logo-container roll-in-blurred-left">
                            <img className="logo-img" src="./assets/img/mailLogo.svg" />
                        </div>
                    </Link>
                    <Link to={`/keep`}>
                        <div className="logo-container roll-in-top">
                            <img className="logo-img" src="./assets/img/keepLogo.png" />
                        </div>
                    </Link>

                    <Link to={`/book`}>
                        <div className="logo-container roll-in-right">
                            <img className="logo-img" src="./assets/img/bookLogo.svg" />
                        </div>
                    </Link>

                </section>
            </div>
        )
    }
}