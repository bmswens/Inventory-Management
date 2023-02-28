// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'

// custom
import api from '../../api'
import PutAwayCard from './PutAwayCard'

function AllPutAways(props) {

    let puts = api.putAways.getAll()

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
            {puts.map(put => <PutAwayCard key={put.name} {...put} />)}
        </Grid>
    )
}

export default AllPutAways