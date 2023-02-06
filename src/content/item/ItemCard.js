// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, CardMedia, Grid, IconButton, Tooltip, useTheme } from '@mui/material'

// MUI Icons
import InputIcon from '@mui/icons-material/Input'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Link } from 'react-router-dom'

function StockAvatar(props) {
    const { stock } = props
    const theme = useTheme()
    return (
        <Tooltip
            title="Stock Count"
        >
            <Avatar
                sx={{
                    backgroundColor: stock ?  theme.palette.success.dark : theme.palette.error.dark
                }}
                alt="stock count 3"
            >   
                {stock}
            </Avatar>
        </Tooltip>
    )
}

function ItemCardHeader(props) {
    const {
        name,
        nsn,
        stock
    } = props

    return (
        <CardHeader
            avatar={<StockAvatar stock={stock} />}
            title={name}
            subheader={`NSN: ${nsn}`}
        />
    )
}

function ItemCardActions(props) {
    
    const { nsn } = props

    return (
        <CardActions>
            <Tooltip
                title="Add To Stock"
            >
                <span>
                    <IconButton
                        aria-label="Add To Stock"
                    >
                        <InputIcon fontSize='large' />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip
                title="Process Order"
            >
                <span>
                    <IconButton
                        aria-label="Process Order"
                    >
                        <LocalShippingIcon fontSize='large' />
                    </IconButton>
                </span>
            </Tooltip>
            <Box sx={{flexGrow: 1}} />
            <Tooltip
                title="View Details"
            >
                <Link to={`/items/${nsn}`}>
                    <IconButton
                        aria-label="View Details"
                    >
                        <OpenInNewIcon fontSize='large' />
                    </IconButton>
                </Link>
            </Tooltip>
        </CardActions>
    )
}

function ItemCard(props) {

    const {
        name,
        nsn,
        img,
        stock
    } = props

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card>
                <ItemCardHeader
                    name={name}
                    nsn={nsn}
                    stock={stock}
                />
                <Box
                    sx={{ display:'flex', justifyContent:'center' }}
                >
                    <CardMedia
                        component="img"
                        image={img}
                        alt={name}
                        sx={{
                            height: "20vh",
                            width: "auto"
                        }}
                    />
                </Box>
                <ItemCardActions
                    nsn={nsn}
                />
            </Card>
        </Grid>
    )
}

export default ItemCard