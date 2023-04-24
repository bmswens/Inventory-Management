// React
import { Autocomplete, Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import React from 'react'

function ShipperSelector(props) {
    const options = [
        {
            label: "FDEDO",
            value: "fdedo",
            group: "FDE"
        },
        {
            label: "FDEDP",
            value: "fdedp",
            group: "FDE"
        },
        {
            label: "FDEDE",
            value: "FDEDE",
            group: "FDE"
        },
        {
            label: "FDEGDG",
            value: "fdedg",
            group: "FDEG"
        },
        {
            label: "UPSNDG",
            value: "upsndg",
            group: "UPSN"
        }
    ]

    return (
        <Grid item xs={3}>
            <Autocomplete
                fullWidth
                options={options}
                groupBy={option => option.group}
                getOptionLabel={option => option.label}
                renderInput={params => <TextField {...params} label="Shipper" />}
            />
        </Grid>
    )
}

function FreeformField(props) {
    const { label, value, setValue } = props

    return (
        <Grid
            item
            xs={3}
        >
            <TextField
                fullWidth
                label={label}
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </Grid>
    )
}

const emptyData = {
    milmode: '',
    tac: '',
    pieces: '',
    weight: '',
    dims: '',
    typePack: '',
    scac: ''
}

function InputGrid(props) {

    const { data, setData } = props

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid
                item
                xs={3}
            >
                <FormControl fullWidth>
                    <InputLabel id="milmode-label">Mil Mode</InputLabel>
                    <Select
                        label="Mil Mode"
                        labelId='milmode-label'
                    >
                        <MenuItem value="s">S</MenuItem>
                        <MenuItem value="s">A</MenuItem>
                        <MenuItem value="s">B</MenuItem>
                        <MenuItem value="s">J</MenuItem>
                        <MenuItem value="s">Q</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <FreeformField
                label="TAC"
                value={data.tac}
                setValue={value => setData({ ...data, tac: value })}
            />
            <FreeformField
                label="Pieces"
                value={data.pieces}
                setValue={value => setData({ ...data, pieces: value })}
            />
            <FreeformField
                label="Weight"
                value={data.weight}
                setValue={value => setData({ ...data, weight: value })}
            />
            <FreeformField
                label="DIMS"
                value={data.dims}
                setValue={value => setData({ ...data, dims: value })}
            />
            <FreeformField
                label="Type Pack"
                value={data.typePack}
                setValue={value => setData({ ...data, typePack: value })}
            />
            <FreeformField
                label="SCAC"
                value={data.scac}
                setValue={value => setData({ ...data, scac: value })}
            />
            <ShipperSelector />
        </Grid>
    )
}


function ShipCard(props) {

    const [data, setData] = React.useState(emptyData)

    return (
        <Grid
            item
            xs={12}
        >
            <Card>
                <CardContent>
                    <InputGrid
                        data={data}
                        setData={setData}
                    />
                </CardContent>
                <CardActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        variant="contained"
                    >
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ShipCard