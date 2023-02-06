// React
import React from 'react'

// MUI
import { Box, Divider, Grid, Typography } from '@mui/material'

// React router
import { useParams } from 'react-router-dom'

// custom
import api from '../../api/demo'

function ItemTitle(props) {
    const { name } = props

    return (
        <Grid item xs={12}>
            <Grid item xs={12}>
                <Typography variant="h3" align="center">
                    {name}
                </Typography>
            </Grid>
        </Grid>
    )
}

function ItemImage(props) {

    const { img, name } = props

    return (
        <Grid 
            item 
            xs={12} 
            md={4} 
            lg={6}
        >
            <Grid 
                container 
                spacing={1} 
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Box
                        component="img"
                        src={img}
                        alt={`${name}`}
                        width="auto"
                        style={{
                            maxHeight: "33vh"
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

function ItemData(props) {
    const {
        nsn,
        location,
        cost,
        stock
    } = props

    let { notes } = props

    if (notes === undefined) {
        notes = ''
    }

    return (
        <Grid item xs={12} md={8} lg={6}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5">
                        NSN: {nsn}
                    </Typography>
                    <Typography variant="h5">
                        Location: {location}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5">
                        Unit Price: ${cost}
                    </Typography>
                    <Typography variant="h5">
                        In Stock: {stock}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Notes:
                    </Typography>
                    {notes?.split('\n').map(note => <Typography key={note}>{note}</Typography>)}
                </Grid>
            </Grid>
        </Grid>
    )
}


function Item(props) {

    const { nsn } = useParams()

    const {
        name,
        img,
        location,
        stock,
        cost,
        notes
    } = api.getByNSN(nsn)
    
    return (
        <Grid
            container
            spacing={1}
        >
            <ItemTitle name={name} />
            <ItemImage name={name} img={img} />
            <ItemData
                nsn={nsn}
                location={location}
                cost={cost}
                stock={stock}
                notes={notes}
            />
        </Grid>
    )
}

export default Item