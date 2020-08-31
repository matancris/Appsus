import { storageService } from '../../../service/storage-service.js'
import { utilsService } from '../../../service/utils-service.js'


export const mailService = {
    query,
    sendMail,
    getMailById,
    updateMail,
    sendToDrafts,
    countUnreadMails,
}

const MAILS_KEY = "mails";

var gMails = [
    { id: utilsService.makeId(), type: 'income', address: 'itay', subject: 'Be There!', body: `Hi Matan, Thanks for signing up!Lots of software say they can do anything and everything for you. We are *not* one of them. KiSSFLOW is not a jack of all trades. We have mastered one thing really well: *workflows*.Now, do you have a workflow problem or a task management problem or both?! Tough, right!? That’s exactly why I am writing to you. Within 5 minutes I can assess if KiSSFLOW is best fit for the problem you have, saving you lots of time on evaluation. I value time and wish neither of us waste it.I will call you in the next 30 minutes or do you want to do this over email? Cheers, Ben`, isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'itay', subject: 'Welcome to Slack', body: 'Welcome to Slack! We\'re happy you\'re here.When you created Front Onboarding, we didn\'t ask you to set a password. It\'s time to do that now. If you don\'t set a password within two days, we\'ll automatically log you out.', isStarred: false, isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'itay', subject: 'Wassap?', body: 'Hi Leads, We noticed that you signed up for Dropbox a while ago, but never installed the software. Installing Dropbox lets you: Easily save files to your Dropbox Get to your files from any computer or phone Share photos or docs straight from your desktop Download Dropbox here, Enjoy! The Dropbox Team If you need a refresh, check out our tour.', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Matan', subject: 'We are on fireee', body: 'Pick up!', isStarred: true, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Yaron', subject: 'You are my hero', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Idan', subject: 'lets do it!', body: 'Pick up!', isStarred: true, isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: true, isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'Hilla', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'income', address: 'itay', subject: 'Wassap?', body: 'Pick up!', isStarred: false, isRead: false, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'outcome', address: 'Yaron@gmail.com', subject: 'You are my hero', isStarred: false, body: 'Pick up!', isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'outcome', address: 'Idan@gmail.com', subject: 'lets do it!', isStarred: false, body: 'Pick up!', isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'outcome', address: 'Hilla@gmail.com', subject: 'Wassap?', isStarred: false, body: 'Pick up!', isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'draft', address: 'Hilla@gmail.com', subject: 'Wassap?', isStarred: false, body: 'I started to write a letter but didn\'t found the', isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'draft', address: 'Hilla@gmail.com', subject: 'Wassap?', isStarred: false, body: 'I started to write a letter but didn\'t found the', isRead: true, sentAt: 1551133930594 },
    { id: utilsService.makeId(), type: 'draft', address: 'Hilla@gmail.com', subject: 'Try', isStarred: false, body: 'I started to write a letter but didn\'t found the', isRead: true, sentAt: 1551133930594 }
]


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
            return Promise.resolve(mail);
        })
}

function updateMail(mailId, paramToChange, isUnReadClick = true) {
    return getIdxById(mailId)
        .then((mailIdx) => query()
            .then(mails => {
                var currMail = mails[mailIdx]
                if (paramToChange === 'toggleStar') {
                    currMail.isStarred = !currMail.isStarred;
                }
                else if (paramToChange === 'removeMail') {
                    if (currMail.type === 'trash') mails = mails.filter(mail => mail.id !== mailId);
                    else currMail.type = 'trash';
                }
                else if (paramToChange === 'setRead') {
                    currMail.isRead = isUnReadClick;
                }
                storageService.saveToStorage(MAILS_KEY, mails)
                return Promise.resolve()
            })
        )
}

function getIdxById(mailId) {
    return query()
        .then(mails => {
            var idx = mails.findIndex(mail => mail.id === mailId)
            return Promise.resolve(idx)
        })
}

function sendToDrafts(draft) {
    const newDraft = {
        id: utilsService.makeId(),
        type: 'draft',
        address: draft.address,
        subject: draft.subject,
        body: draft.body,
        isStarred: false,
        isRead: true,
        sentAt: Date.now()
    }
    return query()
        .then(mails => {
            mails.push(newDraft);
            storageService.saveToStorage(MAILS_KEY, mails);
            return Promise.resolve();
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
            mails.unshift(newMailIncome);
            mails.unshift(newMailOutcome);
            storageService.saveToStorage(MAILS_KEY, mails);
            return Promise.resolve();
        })
}

function countUnreadMails() {
    let counter = 0
    return query()
        .then(mails => {
            mails.forEach(mail => {
                if (!mail.isRead) counter++;
            })
            return Promise.resolve(counter);
        })
}









// function getNextPrev(mailId) {
//     return query()
//         .then(mails => {
//             const mailIdx = mails.findIndex(mail => mail.id === mailId)
//             const nextmail = mails[mailIdx + 1] || mails[0]
//             const prevmail = mails[mailIdx - 1] || mails[mails.length - 1]
//             return {
//                 prevmailId: prevmail.id,
//                 nextmailId: nextmail.id
//             }
//         })
// }




