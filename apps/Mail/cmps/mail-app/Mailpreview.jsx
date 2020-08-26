
const { Link } = ReactRouterDOM

export function MailPreview({ mail, removeMail, changeReaden }) {

    return (
        <Link to={`/mail/${mail.id}`} onClick={() => changeReaden()}>
            <section className={`mail-preview flex space-between align-center ${mail.isRead ? 'readen' : ''}`}>
                <i className="fas fa-star"></i>
                <div><h3>{mail.from}</h3></div>
                <div><h3>{mail.subject}</h3></div>
                <div><h3>{mail.sentAt}</h3></div>
                <div className="edit-mail">
                    <button onClick={(ev) => {
                        ev.preventDefault()
                        removeMail(mail.id)
                    }
                    } >Delete</button>
                    <button>Mark as readen</button>
                </div>
            </section>
        </Link>

    )
}