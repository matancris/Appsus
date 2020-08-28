
import { storageService } from "../../../service/storage-service.js"
import { utilsService } from "../../../service/utils-service.js"

const KEEP_KEY = 'keeps'

export const keepService = {
    query,
    _add,
    removeKeep,
    save,
    getKeepById,
    getNextPrev,
    getEmptyKeep,
    updateColor,
    copyKeep,
    keepPin,
    doneNote
}

var gKeeps = [
    {
        id: utilsService.makeId(),
        type: "NoteTxt",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: '#ffd5e5'
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            url: "https://images.pexels.com/photos/219302/pexels-photo-219302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#fcf7bb"
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteTodos",
        isPinned: false,
        info: {
            label: "How was it:",
            todos: [
                { txt: "Clean The House", doneAt: null },
                { txt: "Remove the Bugs", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#d6e5fa'
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteVideo",
        isPinned: false,
        info: {
            url: "https://vod-progressive.akamaized.net/exp=1598537378~acl=%2A%2F1270987899.mp4%2A~hmac=d3c930d7b3e3db37fb148d890bdde59b677fc8be642c2498e59903efa817a859/vimeo-prod-skyfire-std-us/01/3/13/325018207/1270987899.mp4?filename=Pexels+Videos+2034096.mp4"
            // title: "Me playing Mi"
        },
        style: {
            backgroundColor: '#e1ccec'
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            // url: "https://getsocialmediatips.com/wp-content/uploads/2019/01/2019-valentines-day-gif-guide.gif",
            url: "https://data.whicdn.com/images/140418212/original.gif",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: '#d3f6f3'
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteVideo",
        isPinned: false,
        info: {
            url: "https://vod-progressive.akamaized.net/exp=1598537514~acl=%2A%2F1301229203.mp4%2A~hmac=81183be5709d8db64dd8079242cb227d668372fada24506a8d271a6895f79768/vimeo-prod-skyfire-std-us/01/1216/13/331083783/1301229203.mp4?filename=Pexels+Videos+2183818.mp4"
            // title: "Me playing Mi"
        },
        style: {
            backgroundColor: '#ececec'
        }
    },
];


function getEmptyKeep() {
    return { type: 'NoteTxt', isPinned: false, info: {}, style: { backgroundColor: 'white' } };
}

function query() {
    let keeps = storageService.loadFromStorage(KEEP_KEY);
    if (!keeps) {
        keeps = gKeeps;
        storageService.saveToStorage(KEEP_KEY, keeps);
    }
    return Promise.resolve(keeps);
}


function getKeepById(keepId) {
    return query()
        .then(keeps => {
            const keep = keeps.find(keep => keep.id === keepId)
            return Promise.resolve(keep);
        })
}

function save(keepToSave) {
    return (
        keepToSave.id ? _updateKeep(keepToSave) : _add(keepToSave)
            .then(() => {
                return Promise.resolve()
            }))
}

function _add(newKeep) {
    const keepToAdd = {
        ...newKeep,
        id: utilsService.makeId()
    }
    return query()
        .then(keeps => {
            keeps.unshift(keepToAdd);
            storageService.saveToStorage(KEEP_KEY, keeps);
            return Promise.resolve();
        })
}

function removeKeep(keepId) {
    return query()
        .then(keeps => {
            const keepIdx = keeps.findIndex(keep => keep.id === keepId);
            keeps.splice(keepIdx, 1);
            storageService.saveToStorage(KEEP_KEY, keeps);
            return Promise.resolve();
        })
}


function _updateKeep(keepToSave) {
    return query()
        .then(keeps => {
            keeps = keeps.map(keep => keep.id === keepToSave.id ? keepToSave : keep)
            storageService.saveToStorage(KEEP_KEY, keeps);
            return Promise.resolve();
        })
}

function updateColor(keepId, color) {
    return query()
        .then(keeps => {
            const _keep = keeps.find(keep => keep.id === keepId);
            _keep.style.backgroundColor = color
            storageService.saveToStorage(KEEP_KEY, keeps);
            return Promise.resolve();
        })
}


function getNextPrev(keepId) {
    return query()
        .then(keeps => {
            const keepIdx = keeps.findIndex(keep => keep.id === keepId)
            const nextKeep = keeps[KeepIdx + 1] || keeps[0]
            const prevKeep = keeps[KeepIdx - 1] || keeps[keeps.length - 1]
            return {
                prevKeepId: prevKeep.id,
                nextKeepId: nextKeep.id
            }
        })
}

function copyKeep(copyKeep) {
    return (
        _add(copyKeep)
            .then(() => {
                return Promise.resolve()
            }))
}

function keepPin(keepId) {
    return query()
        .then(keeps => {
            const _keep = keeps.find(keep => keep.id === keepId);
            _keep.isPinned = !_keep.isPinned;
            storageService.saveToStorage(KEEP_KEY, keeps);
            return Promise.resolve();
        })
}

function doneNote(keepId,keepTodoIdx){
    return query()
    .then(keeps => {
        const keepIdx = keeps.findIndex(keep => keep.id === keepId)
        keeps[keepIdx].info.todos[keepTodoIdx].doneAt = new Date();
        storageService.saveToStorage(KEEP_KEY, keeps);
        return Promise.resolve();
    })
}
