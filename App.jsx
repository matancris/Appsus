const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { MailApp } from './apps/Mail/MailApp.jsx'
import { KeepApp } from './apps/Keep/KeepApp.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { AsideBar } from './cmps/AsideBar.jsx'
export class App extends React.Component {

    render() {
        return (
            <Router>
                <div class="container">
                    <header >
                        <NavBar />
                    </header>
                    <main className="main flex">
                        {/* <AsideBar /> */}
                        <Switch>
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

