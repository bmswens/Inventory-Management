// React
import React from 'react'

// MUI
import { Grid, IconButton, Card, CardContent, CardActions, TextField, Stack, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

// custom
import api from '../../api'
import OrderCard from './OrderCard'
import ItemDialog from '../../dialog/PullItemDialog'

function AllOrders(props) {

    const [ text, setText ] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [itemDialogOpen, setItemDialogOpen] = React.useState(false)

    function close() {
        setItemDialogOpen(false)
    }

    let orders = api.orders.getAll()

    let toDisplay = []
    let searchKeys = [
        "nsn",
        "name",
        "location"
    ]
    if (search) {
        for (let order of orders) {
            let shouldAdd = false
            for (let key of searchKeys) {
                let value = order[key]
                if (!value) {
                    continue
                }
                if (value.includes(search)) {
                    shouldAdd = true
                }
            }
            if (shouldAdd) {
                toDisplay.push(order)
            }
        }
    }
    else {
        toDisplay = orders
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
                                <AddIcon fontSize="large" />
                            </IconButton>
                            <Button
                                variant="contained"
                                onClick={() => setSearch(text)}
                            >
                                Search
                            </Button>
                            <ItemDialog
                                open={itemDialogOpen}
                                close={close}
                            />
                        </Stack>
                    </CardActions>
                </Card>

            </div>

            <Grid
                container
                spacing={1}
                sx={{
                    paddingLeft: "7px",
                    paddingRight: "7px",
                    marginTop: "7px"
                }}
            >
                {toDisplay.map(order => <OrderCard key={order.name} {...order} />)}
            </Grid>
        </>
    )
}

export default AllOrders