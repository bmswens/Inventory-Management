// React
import React from 'react'

// React router
import { Route, Routes } from 'react-router-dom'

// custom
import AllItems from './item/AllItems'
import HomePage from './HomePage'
import AllOrders from './order/AllOrders'
import SpareParts from './spareparts/SpareParts'
import AllPutAways from './putaway/AllPutAways'
import ManifestPage from './manifests/ManifestPage'
import ShipInputPage from './ship/ShipInputPage'

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
                path="/pull"
                element={<AllOrders />}
            />
            <Route
                path="/spare-parts"
                element={<SpareParts />}
            />
            <Route
                path="/put-away"
                element={<AllPutAways />}
            />
            <Route
                path="/manifests/:id"
                element={<ManifestPage />}
            />
            <Route
                path="/shipping/:id"
                element={<ShipInputPage />}
            />
        </Routes>
    )
}

export default Content