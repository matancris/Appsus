
import { storageService } from "../../../service/storage-service.js"
import { utilsService } from "../../../service/utils-service.js"
import { func } from "prop-types";

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
    copyKeep
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
            url: "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=150",
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
    },
    {
        id: utilsService.makeId(),
        type: "NoteVideo",
        isPinned: false,
        info: {
            url: "https://youtu.be/FHeTKM5i4CQ"
            // title: "Me playing Mi"
        },
        style: {
            backgroundColor: 'white'
        }
    },
    {
        id: utilsService.makeId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            url: "https://i.pinimg.com/originals/e3/d0/86/e3d086800546d84d641102cba6fd084a.gif",
            title: "Me playing Mi"
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

function copyKeep(copyKeep){
    return query()
    .then(keeps => {
        keeps.unshift(copyKeep);
        storageService.saveToStorage(KEEP_KEY, keeps);
        return Promise.resolve();
    })
}