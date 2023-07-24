// React
import React from 'react'

// MUI
import { Grid, Card, CardContent, TextField, CardActions, Stack, IconButton, Button } from '@mui/material'
import ExploreIcon from '@mui/icons-material/Explore';

// custom
import api from '../../api'
import PutAwayCard from './PutAwayCard'
import ItemDialog from '../../dialog/ItemDialog'

function AllPutAways(props) {

    const [ text, setText ] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [itemDialogOpen, setItemDialogOpen] = React.useState(false)

    function close() {
        setItemDialogOpen(false)
    }

    let puts = api.putAways.getAll()

    let toDisplay = []
    let searchKeys = [
        "nsn",
        "name",
        "finalBin"
    ]
    if (search) {
        for (let put of puts) {
            let shouldAdd = false
            for (let key of searchKeys) {
                let value = put[key]
                if (!value) {
                    continue
                }
                if (value.includes(search)) {
                    shouldAdd = true
                }
            }
            if (shouldAdd) {
                toDisplay.push(put)
            }
        }
    }
    else {
        toDisplay = puts
    }

    return (
        <>
            <div 
                style={{
                    paddingLeft: "7px",
                    paddingRight: "7px",
                    marginTop: "7px"
                }}>

                <Card>
                    <CardContent style={{paddingBottom: "0px"}} >
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
                    </CardContent>
                    <CardActions>
                        <Stack
                            width='100%'
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <IconButton
                                onClick={() => {
                                    setItemDialogOpen(true)
                                }}
                            >
                                <ExploreIcon sx={{ fontSize: "6vmin" }} />
                            </IconButton>
                            <Button
                                variant="contained"
                                onClick={() => setSearch(text)}
                            >
                                Search
                            </Button>
                            <ItemDialog
                                dialogBoxName="Putaway Box"
                                open={itemDialogOpen}
                                close={close}
                            />
                        </Stack>
                    </CardActions>
                </Card>
                <Grid
                    container
                    spacing={1}
                    sx={{
                        paddingLeft: "7px",
                        paddingRight: "7px",
                        marginTop: "7px"
                    }}
                >
                    {toDisplay.map(put => <PutAwayCard key={put.name} {...put} />)}
                </Grid>
            </div>
        </>
    )
}

export default AllPutAways