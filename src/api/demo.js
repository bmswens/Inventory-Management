import items from './items.json'
import orders from './orders.json'
import spareParts from './spareparts.json'

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
    }
}


export default api