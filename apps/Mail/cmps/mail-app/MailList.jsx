
import { MailPreview } from './Mailpreview.jsx'


export function MailList({ mails, changeRead, removeMail, toggleStar, onSendToTrash }) {

    return <ul className="mail-list clean-list">
        {
            mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} changeRead={changeRead} onSendToTrash={onSendToTrash} removeMail={removeMail} onToggleStar={() => toggleStar(mail)} />
                </li>
            )
        }
    </ul>
}