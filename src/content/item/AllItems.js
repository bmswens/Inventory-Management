// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'

// custom
import ItemCard from './ItemCard'
import api from '../../api'

function AllItems(props) {

    let items = api.items.getAll()

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
            {items.map(item => <ItemCard key={item.nsn} {...item} />)}
        </Grid>
    )
}

export default AllItems