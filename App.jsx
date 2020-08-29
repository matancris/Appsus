const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { MailApp } from './apps/Mail/MailApp.jsx'
import { KeepApp } from './apps/Keep/KeepApp.jsx'
import { BookApp } from './apps/Books/BookApp.jsx'
import { BookDetails } from './apps/Books/BookDetails.jsx'
import { NavBar } from './cmps/NavBar.jsx'
import { MailDetails } from './apps/Mail/pages/MailDetails.jsx'
import { Notification } from './cmps/Notification.jsx'


export class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <header >
                        <NavBar />
                    </header>
                    <main className="main flex justify-center">
                        <Switch>
                            <Route component={MailDetails} path="/mail/:mailId" />
                            <Route component={KeepApp} path="/keep/:mail?" />
                            <Route component={MailApp} path="/mail" />
                            <Route component={BookDetails} path="/book/:bookId" />
                            <Route component={BookApp} path="/book" />
                            <Route component={Home} path="/" />
                        </Switch>
                    </main>
                    <Notification />
                </div>
            </Router>
        )
    }
}

