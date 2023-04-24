import items from './items.json'
import orders from './orders.json'
import spareParts from './spareparts.json'
import puts from './putaways.json'
import local from './local'

// items
function getAll() {
    let output = []
    for (let nsn in items) {
        let fullItem = items[nsn]
        output.push(fullItem)
    }
    return output
}

function getByNSN(nsn) {
    if (!nsn) {
        return {}
    }
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
function getAllSpareParts() {
    return spareParts
}

// put away
function getAllPuts() {
    let output = []
    for (let item in puts) {
        output.push(puts[item])
    }
    return output
}

// kit
async function getAllKits() {
    return [
        {
            name: "Kit-001"
        },
        {
            name: "Kit-002"
        }
    ]
}

async function getItemsByKit(kit) {
    return [
        {
            id: 1,
            nsn: "001",
            name: "Demo Item 1",
            location: "loc1",
            errc: "XD2",
            quantity: 3,
            authorized: 5
        },
        {
            id: 2,
            nsn: "002",
            name:  "Demo Item 2: Electric Boogaloo",
            location: "loc1",
            errc: "XD2",
            quantity: 1,
            authorized: 15
        }
    ]
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
        update: (bin, data) => {}
    },
    putAways: {
        getAll: getAllPuts
    },
    kit: {
        getAll: getAllKits,
        getItemsByKit: getItemsByKit
    }
}

export default api