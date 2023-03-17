// React
import { Box, Button, Card, CardActions, CardContent, Grid, LinearProgress, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import api from '../../api'
import AddManifestDialog from '../../dialog/AddManifestDialog'
import ManifestCard from './ManifestCard'

function ManifestTopBar(props) {

    const [open, setOpen] = React.useState(false)

    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Stack spacing={1} sx={{marginTop: 1}}>
                        <TextField
                            label="Search"
                        />
                    </Stack>
                </CardContent>
                <CardActions>
                    <Box sx={{flexGrow: 1}} />
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        New Manifest
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => alert("Sorry, not implemented yet :(")}
                    >
                        Search
                    </Button>
                </CardActions>
            </Card>
            <AddManifestDialog
                open={open}
                close={() => setOpen(false)}
            />
        </Grid>
    )
}

function AllManifests(props) {

    const [loading, setLoading] = React.useState(true)
    const [manifests, setManifests] = React.useState([])

    React.useEffect(() => {
        async function load() {
            let m = await api.manifests.getAll()
            setManifests(m)
        }
        if (loading) {
            load()
            setLoading(false)
        }
    }, [loading])

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
            <ManifestTopBar />
            {
                loading ?
                <LinearProgress />
                :
                manifests.map(manifest => <ManifestCard {...manifest} />)
            }
        </Grid>
    )
}

export default AllManifests