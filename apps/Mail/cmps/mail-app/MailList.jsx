
import { MailPreview } from './Mailpreview.jsx'


export function MailList({ mails, onUpdateMail }) {

    return <ul className="mail-list clean-list">
        {
            mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} onUpdateMail={onUpdateMail} />
                </li>
            )
        }
    </ul>
}