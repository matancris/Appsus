
const { Link } = ReactRouterDOM

export function MailPreview({ mail, removeMail, changeRead, onToggleStar }) {

    return (
        // 
        <Link to={`/mail/${mail.id}`} onClick={() => changeRead(mail)} >
            <section className={`mail-preview flex space-between align-center ${mail.isRead ? 'readen' : ''}`}>
                <button className="star-btn" onClick={(ev) => {
                    ev.preventDefault()
                    ev.stopPropagation()
                    onToggleStar()
                }}>
                    {mail.isStarred && <i className="fav-star-starred fas fa-star"></i>}
                    {!mail.isStarred && <i className="fav-star far fa-star"></i>}
                </button>
                <div><h3>{mail.address}</h3></div>
                <div><h3>{mail.subject}</h3></div>
                <div><p>{mail.body}</p></div>
                <div><h3>{new Date(mail.sentAt).toLocaleString()}</h3></div>
                <div className="edit-mail">
                    <button onClick={(ev) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        removeMail(mail.id)
                    }
                    } ><i className="fas fa-trash"></i> </button>
                    <button onClick={(ev) => {
                        ev.preventDefault()
                        ev.stopPropagation()
                        changeRead(mail, false)
                    }
                    }><i className="fas fa-envelope"></i> </button>
                </div>
            </section>
        </Link>

    )
}