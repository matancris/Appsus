
import { MailPreview } from 'MailPreview.jsx'


export function MailList({ mails, changeRead, removeMail, toggleStar }) {

    return <ul className="mail-list clean-list">
        {
            mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} changeRead={changeRead} removeMail={removeMail} onToggleStar={() => toggleStar(mail)} />
                </li>
            )
        }
    </ul>
}