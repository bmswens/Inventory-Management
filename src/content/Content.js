// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'
import Item from './item/Item'
import ItemCard from './item/ItemCard'

// custom


function Content(props) {

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
            <Item
                name="Fuse, Cartridge"
                url="./img/fuse.png"
                nsn="5920014702312"
                location="01A004B001"
                cost={1.03}
                stock={3}
                notes={"3 units on backorder.\nEach item is a package of two."}
            />
            <ItemCard
                name="Fuse, Cartridge"
                img="./img/fuse.png"
                nsn="5920014702312"
                stock={3}
            />
        </Grid>
    )
}

export default Content