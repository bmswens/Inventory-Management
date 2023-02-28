// React
import React from 'react'

// MUI
import { Grid, Card, CardContent, TextField, Stack, Button } from '@mui/material'

// custom
import ItemCard from './ItemCard'
import api from '../../api'

function ItemSearch(props) {
    const { search, setSearch } = props
    const [ text, setText ] = React.useState(search)
    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    width: "100%"
                }}
            >
                <CardContent>
                    <Stack
                        alignItems="flex-end"
                        spacing={1}
                    >
                        <TextField
                            fullWidth
                            type="search"
                            label="Search"
                            value={text}
                            onChange={event => setText(event.target.value)}
                            onKeyDown={event => {
                                if (event.key === "Enter") {
                                    setSearch(text)
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => setSearch(text)}
                        >
                            Search
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}

function AllItems(props) {

    let items = api.items.getAll()
    const [search, setSearch] = React.useState('')
    
    let toDisplay = []
    let searchKeys = [
        "nsn",
        "name",
        "location",
        "errc"
    ]
    if (search) {
        for (let item of items) {
            let shouldAdd = false
            for (let key of searchKeys) {
                let value = item[key]
                if (value.includes(search)) {
                    shouldAdd = true
                }
            }
            if (shouldAdd) {
                toDisplay.push(item)
            }
        }
    }
    else {
        toDisplay = items
    }
    

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
            <ItemSearch
                search={search}
                setSearch={setSearch}
            />
            {toDisplay.map(item => <ItemCard key={item.nsn} {...item} />)}
        </Grid>
    )
}

export default AllItems