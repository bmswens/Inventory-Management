import items from './items.json'
import orders from './orders.json'

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

const api = {
    items: {
        getAll,
        getByNSN
    },
    orders: {
        getAll: getAllOrders,
        getByName: getOrderByName
    }
}

export default api