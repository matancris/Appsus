const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { MailApp } from './apps/Mail/MailApp.jsx'
import { KeepApp } from './apps/Keep/KeepApp.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { MailDetails } from './apps/Mail/pages/MailDetails.jsx'

export class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <header >
                        <NavBar />
                    </header>
                    <main className="main flex justify-center">
                        {/* <AsideBar /> */}
                        <Switch>
                            <Route component={MailDetails} path="/mail/:mailId"/>
                            <Route component={KeepApp} path="/keep" />
                            <Route component={MailApp} path="/mail" />
                            <Route component={Home} path="/" />
                        </Switch>
                    </main>

                </div>
            </Router>
        )
    }
}

