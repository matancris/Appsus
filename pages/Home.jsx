const { Link } = ReactRouterDOM

export class Home extends React.Component {

    render() {
        return (
            <div className="main-home flex justify-center column"> 
                <div className="title-home ">Welcome To Appsus</div>
                <section className="logo-imgs justify-center flex">
                    <Link to={`/mail`}>
                        <div className="roll-in-blurred-left">
                            <img className="logo-img" src="./assets/img/mailLogo.svg" />
                        </div>
                    </Link>
                    <Link to={`/keep`}>
                    <div className="roll-in-top">
                        <img className="logo-img" src="./assets/img/keepLogo.png" />
                    </div>
                    </Link>
                    <div className=" roll-in-right">
                        <img className="logo-img" src="./assets/img/bookLogo.svg" />
                    </div>
                </section>
            </div>
        )
    }
}