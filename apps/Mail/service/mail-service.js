import { storageService } from '../../../service/storage-service.js'


export const mailService = {
    query,
    addMail,
    updateReaden,
    removeMail,
    getMailById,
    // getNextPrev
}

const MAILS_KEY = "mails";

var gMails = [
    { id: 'i101', from: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: 'i102', from: 'Matan', subject: 'We are on fireee', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: 'i103', from: 'Yaron', subject: 'You are my hero', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: 'i104', from: 'Idan', subject: 'lets do it!', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: 'i105', from: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
];

function query() {
    let mails = storageService.loadFromStorage(MAILS_KEY);
    if (!mails || mails.length === 0) {
        mails = gMails;
        storageService.saveToStorage(MAILS_KEY, mails);
    }
    return Promise.resolve(mails);
}

function getMailById(mailId) {
    return query()
        .then(mails => {
            const mail = mails.find(mail => mail.id === mailId)
            return Promise.resolve(mail);
        })
}

function updateReaden(mail) {
    console.log("updateReaden -> mail", mail.id)
    return getIdxById(mail.id)
        .then((mailIdx) => query()
            .then(mails => {
                console.log(mailIdx);
                var currMail = mails[mailIdx]
                currMail.isRead = true
                storageService.saveToStorage(MAILS_KEY, mails)
                console.log("updateReaden -> mails", mails)
                return Promise.resolve()
            }))

}

function getIdxById(mailId) {
    console.log("getIdxById -> mail", mailId)
    return query()
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            return Promise.resolve(idx)
        })
}

function addMail(newMail) {
    return query()
        .then(mails => {
            mails.push(newMail);
            storageService.saveToStorage(MAILS_KEY, mails);
            return Promise.resolve();
        })
}

function removeMail(mailId) {
    return query()
        .then((mails) => {
            mails =
                mails.filter(mail => mail.id !== mailId)
            storageService.saveToStorage(MAILS_KEY, mails);
            return Promise.resolve();
        }
        )
    // mails = mails.filter(mail => mail.id !== mailId)
}





