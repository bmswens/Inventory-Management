// React
import React from 'react'

// MUI
import { Card, CardContent, Grid, TextField } from '@mui/material'

// react router
import { useSearchParams } from 'react-router-dom'

// custom
import api from '../../api'
import SparePartCard from './SparePartCard'


const SparePartsSearchContext = React.createContext({text: ""})

function SparePartsSearch(props) {

    const [text, setText] = React.useState("")

    // URL stuff
    const [params] = useSearchParams()

    React.useEffect(() => {
        if (params.get("bin")) {
            setText(params.get("bin"))
        }
    }, [params])


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

    const [parts, setParts] = React.useState([])
    React.useEffect(() => {
        async function load() {
            let p = await api.spareParts.getAll()
            setParts(p)
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