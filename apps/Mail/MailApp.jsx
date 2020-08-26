import { AsideBar } from '../../cmps/AsideBar.jsx'
import { mailService } from '../Mail/service/mail-service.js'
import { MailList } from './cmps/mail-app/MailList.jsx'
import {MailFilter} from './cmps/mail-app/MailFilter.jsx'

export class MailApp extends React.Component {
    state = {
        mailToAdd: '',
        filterBy: '',
        filterRatio: '',
        mails: []
    }


    componentDidMount() {
        this.loadMails();
    }

    loadMails() {
        mailService.query()
            .then((mails) => this.setState({ mails }))
    }

    changeRead = (mail) => {
        console.log(mail);
        mailService.updateReaden(mail)
    }

    removeMail = (mailId) => {
        mailService.removeMail(mailId)
            .then(() => this.loadMails())
    }

    setFilter = (ev, filterBy) => {
        if (ev.target.type === 'text') this.setState({ filterBy: ev.target.value })
    else if (ev.target.type === 'radio') this.setState({ filterRatio: ev.target.value })
    }

    mailsToShow() {
        let mails = this.state.mails.filter(mail => mail.from.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        if (this.state.filterRatio === 'read'){
            mails = this.state.mails.filter(mail => mail.isRead)
        }
        else if (this.state.filterRatio === 'unread') {
            
            mails = this.state.mails.filter(mail => !mail.isRead)
        }
        return mails;
    }

    render() {
        const mails = this.mailsToShow()
        if (!mails) return <h2> loading...</h2>
        return (
            <section className="main-mail flex">
                <AsideBar />
                <div className="mails-container">
                    <h2>Mail App</h2>
                    <MailFilter filterBy={this.state.filterBy} onSetFilter={this.setFilter} />
                    <MailList mails={mails} changeRead={this.changeRead} removeMail={this.removeMail} />
                </div>
            </section>
        )
    }
}