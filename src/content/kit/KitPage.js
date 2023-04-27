// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// router
import { useParams } from 'react-router-dom'

// Custom
import KitCard from './KitCard'
import api from '../../api'

function KitTable(props) {
    const { kit } = props

    // load items
    const [items, setItems] = React.useState([])
    React.useEffect(() => {
        async function load() {
            let i = await api.kit.getItemsByKit(kit)
            setItems(i)
        }
        load()
    }, [kit])

    const columns = [
        {
            field: "nsn",
            headerName: "NSN",
            flex: 1
        }, 
        {
            field: "name",
            headerName: "Name",
            flex: 1.2
        }, 
        {
            field: "location",
            headerName: "Location",
            flex: 0.6
        },
        {
            field: "errc",
            headerName: "ERRC",
            flex: 0.5
        },
        {
            field: "quantity",
            headerName: "Quantiy In Stock",
            flex: 1
        },
        {
            field: "authorized",
            headerName: "Quantiy Authorized",
            flex: 1
        }
    ]

    return (
        <Grid 
            item 
            xs={12}
            sx={{
                height: "calc(100vh - 215px)"
            }}
        >
            <DataGrid
                rows={items}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
            />
        </Grid>
    )

}


function KitPage(props) {

    let { kit } = useParams()

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
            <KitCard 
                name={kit} 
            />
            <KitTable
                kit={kit}
            />
        </Grid>
    )
}

export default KitPage