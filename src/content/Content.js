// React
import React from 'react'

// React router
import { Route, Routes } from 'react-router-dom'

// custom
import AllItems from './item/AllItems'
import Item from './item/Item'
import HomePage from './HomePage'
import AllOrders from './order/AllOrders'
import Order from './order/Order'

function Content(props) {

    return (
        <Routes>
            <Route
                path="/"
                element={<HomePage />}
            />
            <Route
                path="/items"
                element={<AllItems />}
            />
            <Route
                path="/items/:nsn"
                element={<Item />}
            />
            <Route
                path="/orders"
                element={<AllOrders />}
            />
            <Route
                path="/orders/:name"
                element={<Order />}
            />
        </Routes>
    )
}

export default Content