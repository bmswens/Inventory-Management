import db from "./db"

async function getAll() {
    return await db.manifests.toArray()
}

async function addDocument(id, document) {
    let manifest = await db.manifests.where('id').equals(id).first()
    let newDocs = [...manifest.docs, document]
    await db.manifests.put({...manifest, docs: newDocs})
}

async function add(id) {
    await db.manifests.add({id: id, docs: [], complete: false})
}

async function complete(id) {
    let manifest = await db.manifests.where('id').equals(id).first()
    await db.manifests.put({...manifest, complete: true})
}

async function getByID(id) {
    return await db.manifests.where('id').equals(id).first()
}

const manifests = {
    getAll,
    addDocument,
    add,
    complete,
    getByID
}

export default manifests