// React
import React from 'react'

// MUI
import { Button, Grid, Typography } from '@mui/material'

// MUI Icons
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import CheckIcon from '@mui/icons-material/Check'

// React router
import { useParams } from 'react-router-dom'

// custom
import api from '../../api/demo'
import CameraDialog from '../../dialog/CameraDialog'


function ScanItemsButton(props) {
    const { nsn, completed, setCompleted, disabled } = props

    function callback(data) {
        if (!data.nsn) {
            alert("Bad QR code")
        }
        else if (data.nsn !== nsn) {
            alert("Wrong Item!")
        }
        else if (data.nsn === nsn) {
            setCompleted()
        }
    }

    function handleClick() {
        setOpen(true)
    }

    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }

    return (
        <>
        <Button
            variant='contained'
            disabled={completed || disabled}
            endIcon={completed ? <CheckIcon /> : <QrCodeScannerIcon />}
            color={completed ? "success" : "primary"}
            onClick={handleClick}
        >
            Scan Items
        </Button>
        <CameraDialog
            callback={callback}
            open={open}
            close={close}
        />
        </>
    )
}

function ScanFinalBinButton(props) {
    const { ready, completed, setCompleted } = props
    const disabled = !ready || completed
    function handleClick() {
        setOpen(true)
    }
    function callback(data) {
        if (!data.bin) {
            alert("Bad QR code")
        }
        else if (data.bin) {
            setCompleted(data.bin)
        }
    }
    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }
    return (
        <>
        <Button
            variant='contained'
            disabled={disabled}
            endIcon={completed ? <CheckIcon /> : <QrCodeScannerIcon />}
            color={completed ? "success" : "primary"}
            onClick={handleClick}
        >
            Scan Bin
        </Button>
        <CameraDialog
            callback={callback}
            open={open}
            close={close}
        />
        </>
    )
}


function Order(props) {

    const { name } = useParams()
    const {
        nsn,
        completed,
        quantity,
        price,
        shipFrom,
        shipTo,
        finalBin
    } = api.orders.getByName(name)

    const [itemScanned, setItemScanned] = React.useState(false)
    const [binScanned, setBinScanned] = React.useState(false)

    let completedDisplay = completed || (itemScanned && binScanned)

    const [binDisplay, setBinDisplay] = React.useState(finalBin)

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
            <Grid item xs={12}>
                <Typography variant="h4" align="center">
                    {name}
                </Typography>
                <Typography variant="h5" align="center">
                    NSN: {nsn}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>
                    Completed: {String(completedDisplay)}
                </Typography>
                <Typography>
                    Quantity: {quantity}
                </Typography>
                <Typography>
                    Total Cost: {price}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography>
                    Ship From: {shipFrom}
                </Typography>
                <Typography>
                    Ship To: {shipTo}
                </Typography>
                <Typography>
                    Final Bin: {binDisplay}
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <ScanItemsButton
                    nsn={nsn}
                    disabled={completed}
                    completed={itemScanned}
                    setCompleted={() => setItemScanned(true)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <ScanFinalBinButton
                    ready={itemScanned}
                    completed={binScanned}
                    setCompleted={(binName) => {setBinDisplay(binName); setBinScanned(true)}}
                />
            </Grid>
        </Grid>
    )
}

export default Order