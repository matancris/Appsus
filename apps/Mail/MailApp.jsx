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
        mailsType: '',
        isComposeShown: false,
        isMobileMenuOpen: false,
        unreadMailAmount: '',
    }

    componentDidMount() {
        this.setState({ mailsType: 'income' })
        this.loadMails();
    }

    loadMails = () => {
        console.log('hi');
        mailService.query()
            .then((mails) => {
                this.setUnreadAmount()
                this.setState({ mails })
            })
    }

    // MAIL EDIT

    changeRead = (mail, isUnReadClick) => {
        console.log(mail);
        mailService.updateReaden(mail, isUnReadClick)
            .then(() => {
                this.loadMails()
            })

    }

    removeMail = (mailId) => {
        if (this.state.mailsType !== 'trash') return
        mailService.removeMail(mailId)
            .then(() => {
                this.loadMails()
            })
    }

    sendToTrash = (mailId) => {
        if (this.state.mailsType === 'trash') return
        mailService.setTrashType(mailId)
            .then(() => {
                this.loadMails()
            })
    }

    setFilter = (ev) => {
        if (ev.target.type === 'search') this.setState({ filterBy: ev.target.value })
        else if (ev.target.type === 'radio') this.setState({ filterRatio: ev.target.value })
    }

    toggleStar = (mail) => {
        mailService.toggleStar(mail)
            .then(() => { this.loadMails() })
    }

    // COMPOSE

    openCompose = () => {
        console.log(this.state.isComposeShown);
        this.setState({ isComposeShown: true })
    }

    closeCompose = () => {
        this.setState({ isComposeShown: false })
    }

    sendToDrafts = (draft) => {
        console.log(draft);
        if (!draft.address && !draft.subject && !draft.body) {
            this.closeCompose();
            return
        }
        mailService.sendToDrafts(draft)
            .then(() => {
                this.closeCompose()
                this.loadMails()
            })
    }

    submitCompose = (newMail) => {
        mailService.sendMail(newMail)
            .then(() => {
                this.closeCompose()
                this.loadMails()
            })
    }

    // ASIDEBAR NAVIGATE

    openInbox = () => {
        this.setState({ mailsType: 'income' })
    }

    openOutcomes = () => {
        this.setState({ mailsType: 'outcome' })
    }

    openStarred = () => {
        mailService.query()
            .then(() => this.setState({ mailsType: 'starred' }))
    }

    openDrafts = () => {
        this.setState({ mailsType: 'draft' })
    }

    openTrash = () => {
        this.setState({ mailsType: 'trash' })
    }

    toggleMobileMenu = () => {
        this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
    }

    setUnreadAmount = () => {
        mailService.countUnreadMails()
            .then(counter => {
                console.log(counter);
                this.setState({ unreadMailAmount: counter })
            })
    }

    // RENDER

    mailsToShow() {
        const currMails = this.state.mails
        let mailsToShow = currMails.filter(mail => mail.type === this.state.mailsType)
        if (this.state.mailsType === 'starred') mailsToShow = currMails.filter(mail => mail.isStarred)
        if (!mailsToShow) return
        let mails = mailsToShow.filter(mail => mail.address.toLowerCase().includes(this.state.filterBy.toLowerCase()))
        if (this.state.filterRatio === 'read') {
            mails = mailsToShow.filter(mail => mail.isRead)
        }
        else if (this.state.filterRatio === 'unread') {
            mails = mailsToShow.filter(mail => !mail.isRead)
        }
        return mails;
    }

    render() {
        const mails = this.mailsToShow()
        if (!mails) return <h2> loading...</h2>
        return (
            <section className="main-mail scale-in-hor-right flex">
                {this.state.isMobileMenuOpen && <div className="screen" onClick={this.toggleMobileMenu}></div>}
                <AsideBar openCompose={this.openCompose} onSent={this.openOutcomes} onInbox={this.openInbox} onStarred={this.openStarred} isMobileMenuOpen={this.state.isMobileMenuOpen} onDrafts={this.openDrafts} unreadMailAmount={this.state.unreadMailAmount} onTrash={this.openTrash} />
                <div className="mails-container">
                    <MailFilter filterBy={this.state.filterBy} onSetFilter={this.setFilter} onOpenMobileMenu={this.toggleMobileMenu} />
                    <MailList mails={mails} changeRead={this.changeRead} removeMail={this.removeMail} toggleStar={this.toggleStar} onSendToTrash={this.sendToTrash} />
                    {this.state.isComposeShown && <MailCompose onCloseCompose={this.closeCompose} onSubmitCompose={this.submitCompose} onSendToDrafts={this.sendToDrafts} keepValue={this.state.keepValue} />}
                </div>
            </section>
        )
    }
}

// FUNCTIONS TO IMPROVE

// KEEP TO MAILS

    // const keepToMail = new URLSearchParams(window.location.href).get('keep');
    // console.log("MailDetails -> componentDidMount -> keepToMail", keepToMail)
    // if (keepToMail) {
    //     this.openCompose()
    //     .then(() => this.setState({keepValue: keepToMail}, () => console.log(this.state.keeps, keep)))
    // }