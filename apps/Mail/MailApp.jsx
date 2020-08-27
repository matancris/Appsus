import { AsideBar } from '../../cmps/AsideBar.jsx'
import { mailService } from '../Mail/service/mail-service.js'
import { MailList } from './cmps/mail-app/MailList.jsx'
import { MailFilter } from './cmps/mail-app/MailFilter.jsx'
import { MailCompose } from './cmps/mail-app/MailCompose.jsx'

export class MailApp extends React.Component {
    state = {
        mailToAdd: '',
        filterBy: '',
        filterRatio: '',
        mails: [],
        isComposeShown: false
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

    openCompose = () => {
        console.log(this.state.isComposeShown);
        this.setState({ isComposeShown: true })
    }

    closeCompose = () => {
        this.setState({ isComposeShown: false })
    }

    submitCompose = (newMail) => {
        mailService.sendMail(newMail)
        .then(() => {
            this.closeCompose()
            this.loadMails()
    })
}


    mailsToShow() {
        let mails = this.state.mails.filter(mail => mail.from.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        if (this.state.filterRatio === 'read') {
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
            <section className="main-mail scale-in-hor-right flex">
                <AsideBar openCompose={this.openCompose}/>
                    
                <div className="mails-container">
                    <MailFilter filterBy={this.state.filterBy} onSetFilter={this.setFilter} />
                    <MailList mails={mails} changeRead={this.changeRead} removeMail={this.removeMail} />
                    {this.state.isComposeShown && <MailCompose onCloseCompose={this.closeCompose} onSubmitCompose={this.submitCompose}/>}
                </div>
            </section>
        )
    }
}