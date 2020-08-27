import { storageService } from '../../../service/storage-service.js'
import { utilsService } from '../../../service/utils-service.js'


export const mailService = {
    query,
    sendMail,
    updateReaden,
    removeMail,
    getMailById,
    toggleStar
    // getNextPrev
}

const MAILS_KEY = "mails";

var gMails = [
        { id: 'i101', type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
        { id: 'i102', type: 'income', address: 'Matan', subject: 'We are on fireee', body: 'Pick up!',isStarred: false, isRead: false, sentAt: 1551133930594 },
        { id: 'i103', type: 'income', address: 'Yaron', subject: 'You are my hero', body: 'Pick up!',isStarred: false, isRead: false, sentAt: 1551133930594 },
        { id: 'i104', type: 'income', address: 'Idan', subject: 'lets do it!', body: 'Pick up!',isStarred: false, isRead: false, sentAt: 1551133930594 },
        { id: 'i105', type: 'income',  address: 'Hilla', subject: 'Wassap?', body: 'Pick up!',isStarred: false, isRead: false, sentAt: 1551133930594 },
        { id: 's103', type: 'outcome',  address: 'Yaron@gmail.com', subject: 'You are my hero',isStarred: false, body: 'Pick up!', isRead: true, sentAt: 1551133930594 },
        { id: 's104', type: 'outcome',  address: 'Idan@gmail.com', subject: 'lets do it!',isStarred: false, body: 'Pick up!', isRead: true, sentAt: 1551133930594 },
        { id: 's105', type: 'outcome',  address: 'Hilla@gmail.com', subject: 'Wassap?',isStarred: false, body: 'Pick up!', isRead: true, sentAt: 1551133930594 }
    ]





// var gSentMails = [
//     { id: 's103', to: 'Yaron@gmail.com', subject: 'You are my hero', body: 'Pick up!', sentAt: 1551133930594 },
//     { id: 's104', to: 'Idan@gmail.com', subject: 'lets do it!', body: 'Pick up!', sentAt: 1551133930594 },
//     { id: 's105', to: 'Hilla@gmail.com', subject: 'Wassap?', body: 'Pick up!', sentAt: 1551133930594 }
// ]

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
            let mail = mails.find(mail => mail.id === mailId)
            // if (!mail) mail = mails.outcomes.find(mail => mail.id === mailId)
            return Promise.resolve(mail);
        })
}

function updateReaden(mail, isUnReadClick = true) {
    console.log("updateReaden -> mail", mail)
    return getIdxById(mail.id)
        .then((mailIdx) => query()
            .then(mails => {
                var currMail = mails[mailIdx]
                console.log("updateReaden -> isReadenClick", isUnReadClick)
                currMail.isRead = isUnReadClick;
                storageService.saveToStorage(MAILS_KEY, mails)
                return Promise.resolve()
            }))

}

function toggleStar(mail){
    return getIdxById(mail.id)
    .then((mailIdx) => query()
        .then(mails => {
            var currMail = mails[mailIdx]
            currMail.isStarred = !currMail.isStarred;
            console.log(mails);
            storageService.saveToStorage(MAILS_KEY, mails)
            return Promise.resolve()
        }))
}

function getIdxById(mailId) {
    console.log("getIdxById -> mail", mailId)
    return query()
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            console.log("getIdxById -> idx", idx)
            return Promise.resolve(idx)
        })
}

function sendMail(mail) {
    const newMailIncome = {
        id: utilsService.makeId(),
        type: 'income',
        address: 'Matan',
        subject: mail.subject,
        body: mail.body,
        isStarred: false,
        isRead: false,
        sentAt: Date.now()
    }

    const newMailOutcome = {
        id: utilsService.makeId(),
        type: 'outcome',
        address: mail.address,
        subject: mail.subject,
        body: mail.body,
        isStarred: false,
        isRead: true,
        sentAt: Date.now()
    }

    return query()
        .then(mails => {
            mails.push(newMailIncome);
            mails.push(newMailOutcome);
            storageService.saveToStorage(MAILS_KEY, mails);
            return Promise.resolve();
        })
}

function removeMail(mailId) {
    return query()
        .then((mails) => {
            mails = mails.filter(mail => mail.id !== mailId)
            console.log("removeMail -> mails", mails)
            storageService.saveToStorage(MAILS_KEY, mails);
            return Promise.resolve();
        }
        )
    // mails = mails.filter(mail => mail.id !== mailId)
}





