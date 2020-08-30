
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onUpdateMail }) {

    return (
        <Link to={`/mail/${mail.id}`} onClick={() => onUpdateMail(mail.id, 'setRead')} >
            <section className={`mail-preview flex space-between align-center ${mail.isRead ? 'readen' : ''}`}>
                <button className="star-btn" onClick={(ev) => {
                    ev.preventDefault()
                    ev.stopPropagation()
                    onUpdateMail(mail.id, 'toggleStar')
                }}>
                    {mail.isStarred && <i className="fav-star-starred fas fa-star"></i>}
                    {!mail.isStarred && <i className="fav-star far fa-star"></i>}
                </button>
                <div><h3 className="address-preview">{mail.address}</h3></div>
                <div className="sub-body-container flex space-between flex-1">
                    <div><h3>{mail.subject}</h3></div>
                    <div><p>{mail.body}</p></div>
                </div>
                <div className="date-title"><h3>{new Date(mail.sentAt).toLocaleString()}</h3></div>
                <div className="edit-mail">
                    <button onClick={(ev) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        onUpdateMail(mail.id, 'removeMail')
                    }
                    } ><i className="fas fa-trash"></i> </button>
                    <button onClick={(ev) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        onUpdateMail(mail.id, 'setRead', false)
                    }
                    }><i className="fas fa-envelope"></i> </button>
                </div>
            </section>
        </Link>

    )
}