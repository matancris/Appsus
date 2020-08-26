import { mailService } from '../../service/mail-service.js'

export class MailCompose extends React.Component {

    state = {
        newMail: {
            to: '',
            subject: '',
            body: ''
        }
    }


    elInput = React.createRef()

    componentDidMount() {
        this.elInput.current.focus()
    }

    onInputChange = (ev) => {
        console.log(this.newMail);
        this.setState({ newMail: { ...this.state.newMail, [ev.target.name]: ev.target.value } })
    }

    onSubmitCompose = (ev) => {
        ev.preventDefault()
        this.props.onSubmitCompose(this.state.newMail)
    }


    render() {

        return (
            <div className="email-compose flex column space-between" >
                <div className="compose-header flex space-between align-center">
                    <p> New Message </p>
                    <div className="header-controls flex">
                        <button onClick={() => this.props.onCloseCompose()}> <i className="fas fa-times"></i> </button>
                    </div>
                </div>
                <form onSubmit={this.onSubmitCompose} className="flex column space-between flex-1">
                    {/* <section className="flex column space-between flex-1"> */}
                    <div className="compose-to">
                        <input type="email" name="to" placeholder="To" />
                    </div>
                    <div className="compose-subject">
                        <input ref={this.elInput} type="text" name="subject" placeholder="Subject" onChange={this.onInputChange} />
                    </div>

                    <div className="compose-body flex-1">
                        <textarea rows="25" type="text" name="body" placeholder="Write your mail here" onChange={this.onInputChange} />
                    </div>
                    {/* </section> */}
                    <section className="compose-footer flex space-between align-center">
                        <button type="submit" title="Send" onClick={this.on}> Send </button>
                        <button className="fas fa-trash"></button>
                    </section>
                </form>
            </div>

        )
    }
}
