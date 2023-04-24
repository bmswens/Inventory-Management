// React
import React from 'react'

// MUI
import { Grid, LinearProgress } from '@mui/material'

// custom
import api from '../../api'
import KitCard from './KitCard'

function AllKits(props) {
    const [kits, setKits] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    // load
    React.useEffect(() => {
        async function load() {
            let k = await api.kit.getAll()
            setKits(k)
            setLoading(false)
        }
        load()
    }, [])

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
            { loading ?
                <LinearProgress />
                :
                kits.map(kit => <KitCard {...kit} link />)
            }
        </Grid>
    )
}

export default AllKits