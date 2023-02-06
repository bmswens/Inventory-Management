// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'

// custom
import ItemCard from './item/ItemCard'
import api from '../api/demo'

function Content(props) {

    let items = api.getAll()

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
            {items.map(item => <ItemCard {...item} />)}
        </Grid>
    )
}

export default Content