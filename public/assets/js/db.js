let dbPromised = idb.open('CodeSport', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('clubs')) {
        upgradeDb.createObjectStore('clubs', {
            keyPath: 'id'
        });
    }
    if (!upgradeDb.objectStoreNames.contains('matches')) {
        upgradeDb.createObjectStore('matches', {
            keyPath: 'id'
        });
    }
});

/**
 * menyimpan halaman
 * @param {object} data 
 * @param {string} tableName 
 */
const saveForLater = (data, tableName) => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(db => {
            let tx = db.transaction(tableName, 'readwrite');
            let store = tx.objectStore(tableName);
            store.put(data);
            return tx.complete;
        })
        .then(data => {
            resolve(data);
        });
    });
}

/**
 * get all data in table name
 * @param {string} tableName 
 */
const getAll = tableName => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(db => {
            let tx = db.transaction(tableName, 'readonly');
            let store = tx.objectStore(tableName);
            return store.getAll();
        })
        .then(data => {
            resolve(data);
        });
    });
}

/**
 * get data by id
 * @param {int} id 
 * @param {string} tableName 
 */
const getById = (id, tableName) => {
    return new Promise((resolve, reject) => {
        dbPromised
        .then(db => {
            let tx = db.transaction(tableName, 'readonly');
            let store = tx.objectStore(tableName);
            return store.get(id);
        })
        .then(data => {
            resolve(data);
        });
    });
}

/**
 * delete by id
 * @param {int} id 
 * @param {string} tableName 
 */
const deleteById = (id, tableName) => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction(tableName, 'readwrite');
            let store = tx.objectStore(tableName);
            store.delete(id);
            return tx.complete;
        })
        .then(data => {
            resolve(data);
        });
    });
}

/**
 * check if data is exist
 * @param {int} id 
 * @param {string} tableName
 * @return {boolean}
 */
const isExist = (id, tableName) => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            let tx = db.transaction(tableName, 'readonly');
            let store = tx.objectStore(tableName);
            return store.count(id);
        })
        .then(data => {
            resolve(data);
        });
    });
}

export {saveForLater, getAll, getById, deleteById,  isExist};