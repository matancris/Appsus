
export const keepService = {
    query,
    addKeep,
    removeKeep,
    getKeepById,
    getNextPrev
}

function query() {
    gBooks = storageService.loadFromStorage(KEY_BOOKS);
    if (!gBooks) {
        gBooks = books;
        storageService.saveToStorage(KEY_BOOKS, gBooks);
    }
    return Promise.resolve(gBooks);
}