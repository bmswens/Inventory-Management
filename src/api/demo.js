import data from './data.json'

function getAll() {
    let output = []
    for (let nsn in data) {
        let fullItem = data[nsn]
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
    return data[nsn]
}


const api = {
    getAll,
    getByNSN
}

export default api