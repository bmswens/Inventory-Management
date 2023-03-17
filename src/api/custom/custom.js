import items from '../items.json'
import orders from '../orders.json'


// items
function getAll() {
    let output = []
    for (let nsn in items) {
        let fullItem = items[nsn]
        let item = {
            nsn: fullItem.nsn,
            name: fullItem.name,
            img: fullItem.img,
            stock: fullItem.stock
        }
        output.push(item)
    }
    return output
}

function getByNSN(nsn) {
    return items[nsn]
}

// orders

function getAllOrders() {
    let output = []
    for (let name in orders) {
        output.push(orders[name])
    }
    return output
}

function getOrderByName(name) {
    return orders[name]
}

// spare parts
async function getAllSpareParts() {
    let resp = await fetch("/api/spare-parts")
    let body = await resp.json()
    return body
}

async function updateSparePart(bin, data) {
    let resp = await fetch(`/api/spare-parts/${bin}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return resp.ok
}

const api = {
    items: {
        getAll,
        getByNSN
    },
    orders: {
        getAll: getAllOrders,
        getByName: getOrderByName
    },
    spareParts: {
        getAll: getAllSpareParts,
        update: updateSparePart
    }
}


export default api