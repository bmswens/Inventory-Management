
async function getAllKits() {
    let resp = await fetch(
        '/api/kits'
    )
    let body = await resp.json()
    return body
}

async function getItemsByKit(kit) {
    let resp = await fetch(
        `/api/kits/${kit}`
    )
    let body = await resp.json()
    return body
}

async function restock(kit, nsn, quantity) {
    await fetch(
        `/api/kits/${kit}/${nsn}/restock`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({quantity: quantity})
        }
    )
}

async function issue(kit, nsn, quantity, issuedBy, issuedTo) {
    await fetch(
        `/api/kits/${kit}/${nsn}/issue`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                quantity: quantity,
                issuedBy: issuedBy,
                issuedTo: issuedTo
            })
        }
    )
}

const kit = {
    getAllKits,
    getItemsByKit,
    restock,
    issue
}

export default kit
