// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'

// custom
import api from '../../api'
import OrderCard from './OrderCard'

function AllOrders(props) {

    let orders = api.orders.getAll()

    return (
        <Grid
            container
            spacing={1}
            sx={{
                paddingLeft: "7px",
                paddingRight: "7px",
                marginTop: "7px"
            }}
        >
            {orders.map(order => <OrderCard key={order.name} {...order} />)}
        </Grid>
    )
}

export default AllOrders