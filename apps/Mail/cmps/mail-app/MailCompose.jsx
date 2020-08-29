
export class MailCompose extends React.Component {

    state = {
        newMail: {
            address: '',
            subject: '',
            body: ''
        }
    }


    elInput = React.createRef()

    componentDidMount() {
        const keepValue = this.props.keepToMail
        if (keepValue) {
            this.setState({ newMail: { ...this.state.newMail, body: keepValue } })
        }
        this.elInput.current.focus()
    }

    onInputChange = (ev) => {
        this.setState({ newMail: { ...this.state.newMail, [ev.target.name]: ev.target.value } })
    }

    onSubmitCompose = (ev) => {
        ev.preventDefault()
        this.props.onSubmitCompose(this.state.newMail)
    }

    render() {

        return (
            <div className="mail-compose flex column space-between" >
                <div className="compose-header flex space-between align-center">
                    <p> New Message </p>
                    <div className="header-controls flex">
                        <button title="save to drafts" onClick={() => this.props.onSendToDrafts(this.state.newMail)}> <i className="fas fa-times"></i> </button>
                    </div>
                </div>
                <form onSubmit={this.onSubmitCompose} className="flex column space-between flex-1">
                    <div className="compose-address">
                        <input type="mail" name="address" placeholder="to" onChange={this.onInputChange} />
                    </div>
                    <div className="compose-subject">
                        <input ref={this.elInput} type="text" name="subject" placeholder="Subject" onChange={this.onInputChange} />
                    </div>

                    <div className="compose-body flex-1">
                        <textarea value={this.state.newMail.body} rows="25" type="text" name="body" placeholder="Write your mail here" onChange={this.onInputChange} />
                    </div>
                    <section className="compose-footer flex space-between align-center">
                        <button type="submit" title="Send"> Send </button>
                        <button className="fas fa-trash" onClick={() => this.props.onCloseCompose()}></button>
                    </section>
                </form>
            </div>

        )
    }
}

