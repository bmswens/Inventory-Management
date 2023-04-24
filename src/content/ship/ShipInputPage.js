// React
import React from 'react'

import { DataGrid } from '@mui/x-data-grid'
import { Grid } from '@mui/material'
import ShipCard from './ShipInputCard'

function ShipGrid(props) {
    const columns = [
        {
            field: "id",
            headerName: "TCN",
            flex: 1
        },
        {
            field: "nsn",
            headerName: "NSN",
            flex: 1
        },
        {
            field: "to",
            headerName: "Ship To",
            flex: 0.5
        },
        {
            field: "rdd",
            headerName: "RDD",
            flex: 0.5
        },
        {
            field: "ps",
            headerName: "PS",
            flex: 0.5
        },
        {
            field: "typeCargo",
            headerName: "Type Cargo",
            flex: 0.5
        },
        {
            field: "projectCode",
            headerName: "Project Code",
            flex: 0.5
        }
    ]

    const rows = [
        {
            id: "DemoTCN",
            nsn: "DemoNSN",
            to: "DemoShipTo",
            rdd: "DemoRDD",
            ps: "DemoPS",
            typeCargo: "DemoCargo",
            projectCode: "DemoCode"
        }
    ]
    return (
        <Grid item xs={12}
            sx={{
                height: "calc(100vh - 65px - 225px)"
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
            />
        </Grid>
    )
}

function ShipInputPage(props) {

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
            <ShipCard />
            <ShipGrid />
        </Grid>
    )
}

export default ShipInputPage
