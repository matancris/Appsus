
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
    getEmptyKeep
}

var gKeeps = [
    {
        id: utilsService.makeId(),
        type: "NoteTxt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: '#d7aefb'
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            url: "../../assets/img/1.jpg",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#fbaee8"
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteTodos",
        isPinned: false,
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: '#b1fbae'
        }
    }
];

function getEmptyKeep() {
    return { type: '', isPinned: false, info: {}, style: {} };
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
        .then(()=>{
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
            keeps.push(keepToAdd);
            storageService.saveToStorage(KEEP_KEY, keeps);
            return Promise.resolve();
        })
}

function removeKeep(keepId) {
    return query()
        .then(keeps => {
            const keepIdx = keeps.find(keep => keep.id === keepId);
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





// function removeKeep(keepId){

// }


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

// function _createKeep(_keep) {
//     const keep = {};
//     return keep;
// }
