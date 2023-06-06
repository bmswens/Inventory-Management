// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'

// custom
import api from '../../api'
import PullCard from './PullCard'

function AllPulls(props) {

    let pulls = api.pulls.getAll()

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
            {pulls.map(pull => <PullCard key={pull.name} {...pull} />)}
        </Grid>
    )
}

export default AllPulls
