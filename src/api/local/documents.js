import db from "./db";

async function add(document) {
    await db.documents.add(document)
}

async function getByManifest(manifestId) {
    let manifest = await db.manifests.where('id').equals(manifestId).first()
    let output = []
    for (let docId of manifest.docs) {
        let doc = await db.documents.where('id').equals(docId).first()
        output.push(doc)
    }
    return output
}

const documents = {
    add,
    getByManifest
}

export default documents