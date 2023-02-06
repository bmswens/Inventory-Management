// React
import React from 'react'

// React router
import { Route, Routes } from 'react-router-dom'

// custom
import AllItems from './item/AllItems'
import Item from './item/Item'

function Content(props) {

    return (
        <Routes>
            <Route
                path="/"
                element={<AllItems />}
            />
            <Route
                path="/items/:nsn"
                element={<Item />}
            />
        </Routes>
    )
}

export default Content