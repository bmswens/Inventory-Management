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

function extractMAC(nsn) {
    if (nsn.length === 15) {
        return [nsn.slice(0, 13), nsn.slice(13)]
    }
    return [nsn, '  ']
}

async function makeBatchLine(documentId) {
    let doc = await db.documents.where('id').equals(documentId).first()
    let [nsn, mac] = extractMAC(doc.nsn)
    let money = doc.money.replace('.', '')
    let output = `4661REC    ${nsn}${mac}${doc.unit}${doc.quantity}${doc.id}           01YS0              ${money}`
    return output
}

const documents = {
    add,
    getByManifest,
    makeBatchLine
}

export default documents