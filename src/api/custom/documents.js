
async function add(document) {
    await fetch('/api/manifests/add', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(document)
    })
}

async function getByManifest(manifestId) {
    let resp = await fetch(
        `/api/manifests/${manifestId}/docs`
    )
    let body = await resp.json()
    return body
}

function extractMAC(nsn) {
    if (nsn.length === 15) {
        return [nsn.slice(0, 13), nsn.slice(13)]
    }
    return [nsn, '  ']
}

async function makeBatchLine(documentId) {
    let resp = await fetch(`/api/documents/${documentId}`)
    let doc = await resp.json()
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