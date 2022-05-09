/* eslint-disable */
var dbPromise = idb.open('mcr-order', 1, function (db) {
  if (!db.objectStoreNames.contains('products')) {
    db.createObjectStore('products', {keyPath: 'id'})
  }
})

function writeDataIDB(st, data) {
  for (var key in data) {
    dbPromise
      .then(function (db) {
        var tx = db.transaction(st, 'readwrite')
        var store = tx.objectStore(st)
        store.put(data[key])
        return tx.complete
      });
  }
}

function readAllDataDB(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readonly')
      var store = tx.objectStore(st)
      return store.getAll()
    })
};

function deleteItemFromIDB(st, id) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite')
      var store = tx.objectStore(st)
      store.delete(id)
      return tx.complete
    })
};

function clearAllDataIDB(st) {
  return dbPromise
    .then(function (db) {
      var tx = db.transaction(st, 'readwrite')
      var store = tx.objectStore(st)
      store.clear()
      return tx.complete
    })
};