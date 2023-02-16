// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'

// custom
import api from '../../api/demo'
import SparePartCard from './SparePartCard'

function SpareParts(props) {

    let parts = api.spareParts.getAll()

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
            {parts.map(part => <SparePartCard key={part.bin} {...part} />)}
        </Grid>
    )
}

export default SpareParts