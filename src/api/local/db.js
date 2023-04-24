import Dexie from 'dexie';

const db = new Dexie('myDatabase')
db.version(1).stores({
  manifests: 'id, *docs, complete',
  documents: 'id, nsn, unit, quantity, condition, distribution, unitPrice'
})
// manifest.docs = a list of doc IDs

export default db