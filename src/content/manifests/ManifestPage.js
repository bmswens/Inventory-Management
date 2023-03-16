// React
import { Grid, LinearProgress } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router'
import local from '../../api/local'
import ManifestCard from './ManifestCard'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'


function ManifestTable(props) {
    const { documents } = props
    const columns = [
        {
            field: "id",
            headerName: "Document ID",
            flex: 1
        },
        {
            field: "nsn",
            headerName: "NSN",
            flex: 1
        },
        {
            field: "quantity",
            headerName: "Quantity",
            flex: 1
        }
    ]

    return (
        <Grid 
            item 
            xs={12}
            sx={{
                height: "calc(100vh - 65px - 155px)"
            }}
        >
            <DataGrid
                rows={documents}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                pageSizeOptions={[5, 12, 25, 50]}
            />
        </Grid>
    )
}

function ManifestPage() {
    const { id } = useParams()

    const [loading, setLoading] = React.useState(true)
    const [manifest, setManifest] = React.useState({})
    const [documents, setDocuments] = React.useState([])
    // quick / easy way to force reload
    const [loadCount, setLoadCount] = React.useState(0)

    React.useEffect(() => {
        async function load() {
            let m = await local.manifests.getByID(id)
            let d = await local.documents.getByManifest(id)
            setManifest(m)
            setDocuments(d)
            setLoading(false)
        }
        load()
    }, [id, loading])

    React.useEffect(() => {
        setLoading(true)
    }, [loadCount])

    if (loading) {
        return (
            <LinearProgress />
        )
    }

    console.log(documents)

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
            <ManifestCard
                {...manifest}
                loadCount={loadCount}
                setLoadCount={setLoadCount}
            />
            <ManifestTable
                documents={documents}
            />
        </Grid>
    )

}

export default ManifestPage