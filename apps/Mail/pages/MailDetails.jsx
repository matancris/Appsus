import { LongTxt } from '../cmps/mail-app/LongTxt.jsx'
import { mailService } from '../service/mail-service.js'
import { AsideBar } from '../../cmps/AsideBar.jsx'


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

    getReadingLength() {
        // if (!this.state.mail) return
        const pageCount = this.state.mail.pageCount;
        if (pageCount > 500) return 'Long reading'
        else if (pageCount > 200) return 'Decent Reading'
        else if (pageCount < 100) return 'Light Reading'
    }

    getOldLevel() {
        const publishYear = this.state.mail.publishedDate
        const yearDiff = 2020 - publishYear;
        if (yearDiff > 10) return 'Veteran mail'
        else if (yearDiff < 1) return 'New!'
    }

    getPriceClass() {
        const price = this.state.mail.listPrice.amount;
        if (price > 150) return 'red-price'
        else if (price < 70) return 'green-price'
    }

    toggleLongText = () => {
        const isLongTxtShown = !this.state.isLongTxtShown
        this.setState({ isLongTxtShown })
    }

    addReview = (review) => {
        const mailId = this.state.mail.id;
        mailService.addReview(mailId, review)
            .then(() => {
                this.loadmail()
            })
    }

    render() {
        const mail = this.state.mail
        if (!mail) return <h4>loading</h4>
        // const mailLength = this.getReadingLength();
        // const mailOldLevel = this.getOldLevel();
        // const priceClass = this.getPriceClass();
        return (
            <div className="mail-details flex">
                {/* <img src={mail.thumbnail} alt="" /> */}
                <AsideBar></AsideBar>
                <div className="mail-data-container">
                    <h1>{mail.subject}</h1>
                    <h3>Sender: {mail.from}</h3>
                    {/* <LongTxt text={mail.description} isLongTxtShown={this.state.isLongTxtShown} toggleLength={this.toggleLongText} /> */}
                    <p>{mail.body}</p>
                    {/* <p>{mailOldLevel}</p> */}
                    {/* <ReviewAdd mailId={mail.id} onAddReview={this.addReview} /> */}
                    <button className="back-btn" onClick={() => this.props.history.push('/mail')}>Back</button>
                </div>

                {/* <Reviews mail={mail} /> */}
            </div>
        )
    }
}
