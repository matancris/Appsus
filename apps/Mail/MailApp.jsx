import { AsideBar } from '../../cmps/AsideBar.jsx'
import { mailService } from '../Mail/service/mail-service.js'
import { MailList } from './cmps/mail-app/MailList.jsx'
import { MailFilter } from './cmps/mail-app/MailFilter.jsx'
import { MailCompose } from './cmps/mail-app/MailCompose.jsx'
import eventBus from '../../service/event-bus-service.js'

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
        keepToMail: null
    }

    componentDidMount() {
        const mailSection = new URLSearchParams(window.location.href).get('section')
        const keepToMail = new URLSearchParams(window.location.href).get('keep')
        if (mailSection) {
            this.setState({ mailsType: mailSection })
        }
        else {
            this.setState({ mailsType: 'income' })
        }

        if (keepToMail) {
            this.setState({ keepToMail, isComposeShown: true })
        }
        this.loadMails();
    }

    loadMails = () => {
        mailService.query()
            .then((mails) => {
                this.setUnreadAmount()
                this.setState({ mails })
            })
    }

    // MAIL EDIT

    changeRead = (mail, isUnReadClick) => {
        mailService.updateReaden(mail, isUnReadClick)
            .then(() => {
                this.loadMails()
            })

    }

    removeMail = (mailId) => {
        if (this.state.mailsType !== 'trash') return
        mailService.removeMail(mailId)
            .then(() => {
                eventBus.emit('notify', { msg: 'mail have been removed', type: 'success' })
                this.loadMails()
            })
    }

    sendToTrash = (mailId) => {
        if (this.state.mailsType === 'trash') return
        mailService.setTrashType(mailId)
            .then(() => {
                eventBus.emit('notify', { msg: 'Moved to trash', type: 'success' })
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
        this.setState({ isComposeShown: true })
    }

    closeCompose = () => {
        this.setState({ isComposeShown: false })
    }

    sendToDrafts = (draft) => {
        if (!draft.address && !draft.subject && !draft.body) {
            this.closeCompose();
            return
        }
        mailService.sendToDrafts(draft)
            .then(() => {
                eventBus.emit('notify', { msg: 'Saved to drafts!', type: 'success' })
                this.closeCompose()
                this.loadMails()
            })
    }

    submitCompose = (newMail) => {
        mailService.sendMail(newMail)
            .then(() => {
                eventBus.emit('notify', { msg: 'The mail have been sent!', type: 'success' })
                this.closeCompose()
                this.loadMails()
            })
    }

    // ASIDEBAR NAVIGATE

    changeMailSection = (section) => {
        this.props.history.push(`/mail?&section=${section}`)
        const mailSection = new URLSearchParams(window.location.href).get('section')
        this.setState({ mailsType: mailSection })
    }

    toggleMobileMenu = () => {
        this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
    }

    setUnreadAmount = () => {
        mailService.countUnreadMails()
            .then(counter => {
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
                <AsideBar openCompose={this.openCompose} isMobileMenuOpen={this.state.isMobileMenuOpen} unreadMailAmount={this.state.unreadMailAmount} onChangeSection={this.changeMailSection} />
                <div className="mails-container">
                    <MailFilter filterBy={this.state.filterBy} onSetFilter={this.setFilter} onOpenMobileMenu={this.toggleMobileMenu} />
                    <MailList mails={mails} changeRead={this.changeRead} removeMail={this.removeMail} toggleStar={this.toggleStar} onSendToTrash={this.sendToTrash} />
                    {this.state.isComposeShown && <MailCompose onCloseCompose={this.closeCompose} onSubmitCompose={this.submitCompose} onSendToDrafts={this.sendToDrafts} keepToMail={this.state.keepToMail} />}
                </div>
            </section>
        )
    }
}

