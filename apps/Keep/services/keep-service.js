
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
            txt: "#Home is where the heart is❤ #I don’t think of all the misery but of the beauty that still remains"
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
            url: "https://getsocialmediatips.com/wp-content/uploads/2019/01/2019-valentines-day-gif-guide.gif",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#fcf7bb"
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteAudio",
        isPinned: false,
        info: {
            url: "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
            title: "Best Scene"    
        },
        style: {
            backgroundColor: '#ffd5e5'
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
         url: "https://www.youtube.com/embed/Eq-eQKoEycM",
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
            url: "https://besttv232-ynet-images1-prod.cdn.it.best-tv.com/PicServer5/2019/02/14/9065019/906501001001599640360no.jpg",
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
            // url: "https://www.youtube.com/embed/Mkp9zNM2qoo",
            url: "https://www.youtube.com/embed/tsFeIVJfKsA",
        
            title: "Nirvana song"
        },
        style: {
            backgroundColor: '#ececec'
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteTxt",
        isPinned: false,
        info: {
            txt: `PassWord: 123456 \n UserName: HillaAndMatan`
        },
        style: {
            backgroundColor: '#d4ebd0'
        }
    },
    
    {
        id: utilsService.makeId(),
        type: "NoteTodos",
        isPinned: false,
        info: {
            label: "How was it:",
            todos: [
                { txt: "Add Audio to the keeps", doneAt: 187111111 },
                { txt: "Add canvas to the keeps", doneAt: null },
                { txt: "Fix the bugs", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: 'white'
        }
    }
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
        if(keeps[keepIdx].info.todos[keepTodoIdx].doneAt === null) keeps[keepIdx].info.todos[keepTodoIdx].doneAt = Date.now();
        else keeps[keepIdx].info.todos[keepTodoIdx].doneAt = null;
        storageService.saveToStorage(KEEP_KEY, keeps);
        return Promise.resolve();
    })
}
