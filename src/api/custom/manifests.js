async function getAll() {
    let resp = await fetch("/api/manifests")
    return await resp.json()
}

async function addDocument(id, document) {
    await fetch(
        `/api/manifests/${id}/addDocument`,
        {
            method: "POST",
            body: JSON.stringify({id: document})
        }
    )
}

async function add(id) {
    await fetch(
        `/api/manifests/${id}`,
        {
            method: "POST"
        }
    )
}

async function complete(id) {
    await fetch(
        `/api/manifests/${id}/completed`,
        {
            method: "POST"
        }
    )
}

async function getByID(id) {
    let resp = await fetch(
        `/api/manifests/${id}`
    )
    return await resp.json()
}

const manifests = {
    getAll,
    addDocument,
    add,
    complete,
    getByID
}

export default manifests