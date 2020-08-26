
import { MailPreview } from 'MailPreview.jsx'


export function MailList({ mails, changeRead, removeMail }) {

    return <ul className="mail-list clean-list">
        {
            mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} changeReaden={()=>changeRead(mail)} removeMail={removeMail} />

                </li>
            )
        }
    </ul>
}