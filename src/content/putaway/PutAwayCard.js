// React
import React from 'react'
import { OrderCardHeader } from '../order/OrderCard'

// MUI
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'

// MUI Icons
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import CheckIcon from '@mui/icons-material/Check'
import CameraDialog from '../../dialog/CameraDialog'

// custom
import api from '../../api'

function PutAwayCardBody(props) {
    const {
        location,
        quantity,
        finalBin
    } = props
    return (
        <CardContent>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Typography align="center">
                        Location: {location}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center">
                        Quantity: {quantity}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center">
                        Final Bin: {finalBin}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>
    )
}

function ScanButton(props) {
    const {
        targetKey,
        targetValue,
        name,
        callback,
        disabled,
        completed
    } = props

    const [open, setOpen] = React.useState(false)

    function dialogCallback(data) {
        if (!data[targetKey]) {
            alert("Invalid QR code!")
        }
        else if (data[targetKey] !== targetValue) {
            console.log(data)
            console.log(targetValue)
            alert("Wrong target!")
        }
        else if (data[targetKey] === targetValue) {
            callback()
        }
    }

    return (
        <>
            <Button
                variant="contained"
                disabled={disabled || completed}
                endIcon={completed ? <CheckIcon /> : <QrCodeScannerIcon />}
                onClick={() => setOpen(true)}
            >
                {name}
            </Button>
            <CameraDialog
                open={open}
                close={() => setOpen(false)}
                callback={dialogCallback}
            />
        </>
    )
}


function PutAwayCard(props) {

    const {
        name,
        completed,
        nsn,
        quantityToBin,
        finalBin
    } = props

    const {
        location
    } = api.items.getByNSN(nsn)

    const [completedDisplay, setCompletedDisplay] = React.useState(completed)
    const [itemScanned, setItemScanned] = React.useState(false)
    const [binScanned, setBinScanned] = React.useState(false)

    return (
        <Grid item xs={12}>
            <Card>
                <OrderCardHeader
                    name={name}
                    nsn={nsn}
                    completed={completedDisplay}
                />
                <PutAwayCardBody
                    location={location}
                    quantity={quantityToBin}
                    finalBin={finalBin}
                />
                <CardActions>
                    <ScanButton
                        name="Scan Item"
                        targetKey="nsn"
                        targetValue={nsn}
                        completed={itemScanned}
                        callback={() => setItemScanned(true)}
                    />
                    <Box sx={{flexGrow: 1}} />
                    <ScanButton
                        name="Scan Final Bin"
                        targetKey="bin"
                        targetValue={finalBin}
                        completed={binScanned}
                        disabled={!itemScanned}
                        callback={() => {setBinScanned(true); setCompletedDisplay(true)}}
                    />
                </CardActions>
            </Card>
        </Grid>
    )
}

export default PutAwayCard