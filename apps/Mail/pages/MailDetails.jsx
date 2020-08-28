import { LongTxt } from '../cmps/mail-app/LongTxt.jsx'
import { mailService } from '../service/mail-service.js'
import { AsideBar } from '../../../cmps/AsideBar.jsx'


export class MailDetails extends React.Component {

    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const mailId = this.props.match.params.mailId;
        mailService.getMailById(mailId)
            .then(mail => this.setState({ mail }))
    }

    toggleLongText = () => {
        const isLongTxtShown = !this.state.isLongTxtShown
        this.setState({ isLongTxtShown })
    }


    render() {
        const mail = this.state.mail
        if (!mail) return <h4>loading</h4>
        return (
            <div className="mail-details flex scale-in-hor-right">
                <AsideBar></AsideBar>
                <div className="mail-data-container">
                    <h1>{mail.subject}</h1>
                    <h3>Sender: {mail.address}</h3>
                    <p>{mail.body}</p>
                    <button className="back-btn" onClick={() => this.props.history.push('/mail')}><i className="fas fa-arrow-left"></i> Back to inbox</button>
                </div>
            </div>
        )
    }
}
