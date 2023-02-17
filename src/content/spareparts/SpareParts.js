// React
import React from 'react'

// MUI
import { Card, CardContent, Grid, TextField } from '@mui/material'


// custom
import api from '../../api/demo'
import SparePartCard from './SparePartCard'


const SparePartsSearchContext = React.createContext({text: ""})

function SparePartsSearch(props) {

    const [text, setText] = React.useState("")

    return (
        <SparePartsSearchContext.Provider value={{text}}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <TextField
                            fullWidth
                            label="Search"
                            value={text}
                            onChange={event => setText(event.target.value)}
                        />
                    </CardContent>
                </Card>
            </Grid>
            {props.children}
        </SparePartsSearchContext.Provider>
    )

}

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
            <SparePartsSearch>
                {parts.map(part => <SparePartCard key={part.bin} {...part} />)}
            </SparePartsSearch>
        </Grid>
    )
}

export default SpareParts
export {
    SparePartsSearchContext
}