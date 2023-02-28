// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip, useTheme } from '@mui/material'

// MUI Icons
import InfoIcon from '@mui/icons-material/Info'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import ItemInfoDialog from './ItemInfoDialog'
import QRMakerDialog from '../../dialog/QRMakerDialog'

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
                alt={stock ? "in stock" : "out of stock"}
            >   
                {String(stock)}
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

    const [infoOpen, setInfoOpen] = React.useState(false)
    const [qrOpen, setQrOpen] = React.useState(false)

    return (
        <CardActions>
            <Tooltip
                title="Info"
            >
                <span>
                    <IconButton
                        aria-label="Info"
                        onClick={() => setInfoOpen(true)}
                    >
                        <InfoIcon fontSize='large' />
                    </IconButton>
                </span>
            </Tooltip>
            <Box sx={{flexGrow: 1}} />
            <Tooltip
                title="Show QR Code"
            >
                <IconButton
                    aria-label="Show QR Code"
                    onClick={() => setQrOpen(true)}
                >
                    <QrCode2Icon fontSize='large' />
                </IconButton>
            </Tooltip>
            {/* Dialogs */}
            <ItemInfoDialog
                open={infoOpen}
                close={() => setInfoOpen(false)}
                {...props}
            />
            <QRMakerDialog
                open={qrOpen}
                close={() => setQrOpen(false)}
                data={JSON.stringify({nsn: props.nsn}, null, 2)}
            />
        </CardActions>
    )
}

function ItemCard(props) {

    const {
        name,
        nsn,
        svcBal
    } = props



    return (
        <Grid item xs={12}>
            <Card>
                <ItemCardHeader
                    name={name}
                    nsn={nsn}
                    stock={svcBal}
                />
                <Box
                    sx={{ display:'flex', justifyContent:'center' }}
                >
                </Box>
                <ItemCardActions
                    {...props}
                />
            </Card>
        </Grid>
    )
}

export default ItemCard