// React
import React from 'react'

// MUI
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Grid, Tooltip, Typography, useTheme } from '@mui/material'

// MUI icons
import DoneIcon from '@mui/icons-material/Done'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import CheckIcon from '@mui/icons-material/Check'

// custom
import api from '../../api'
import CameraDialog from '../../dialog/CameraDialog'

function CompletedAvatar(props) {
    const { completed } = props
    const theme = useTheme()
    return (
        <Tooltip
            title={ completed ? "Completed" : "Open Task"}
        >
            <Avatar
                sx={{
                    backgroundColor: completed ?  theme.palette.success.dark : theme.palette.error.dark
                }}
                alt="completion status"
                data-testid={completed ? "task complete" : "task open"}
            >   
                { completed ? <DoneIcon fontSize="large" /> : <PriorityHighIcon fontSize="large" /> }
            </Avatar>
        </Tooltip>
    )
}

function OrderCardHeader(props) {
    const {
        name,
        nsn,
        completed
    } = props

    return (
        <CardHeader
            avatar={<CompletedAvatar completed={completed} />}
            title={`DOC: ${name}`}
            subheader={`NSN: ${nsn}`}
        />
    )
}

function OrderCardBody(props) {
    const {
        quantity,
        unit,
        location,
        finalBin
    } = props

    return (
        <CardContent>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Typography align="center">
                        Quantity: {quantity}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center">
                        Unit: {unit}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center">
                        Location: {location}
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

function ScanItemsButton(props) {
    const { nsn, ready, completed, setCompleted } = props
    const disabled = !ready || completed

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

function OrderCard(props) {

    // data
    const {
        completed,
        name,
        nsn,
        quantity,
        finalBin
    } = props

    const {
        location,
        unit
    } = api.items.getByNSN(nsn)

    // completion status
    const [itemScanned, setItemScanned] = React.useState(false)
    const [binScanned, setBinScanned] = React.useState(false)
    const [bin, setBin] = React.useState(finalBin)

    let completedDisplay = completed || (itemScanned && binScanned)

    return (
        <Grid item xs={12}>
            <Card>
                <OrderCardHeader
                    name={name}
                    nsn={nsn}
                    completed={completedDisplay}
                />
                <OrderCardBody
                    quantity={quantity}
                    unit={unit}
                    location={location}
                    finalBin={bin}
                />
                <CardActions>
                    <ScanItemsButton
                        nsn={nsn}
                        ready
                        disabled={completedDisplay}
                        completed={completedDisplay || itemScanned}
                        setCompleted={() => setItemScanned(true)}
                    />
                    <Box sx={{flexGrow: 1}} />
                    <ScanFinalBinButton
                        ready={itemScanned}
                        completed={completedDisplay || binScanned}
                        setCompleted={(b) => {setBinScanned(true); setBin(b)}}
                    />
                </CardActions>
            </Card>
        </Grid>
    )

}

export default OrderCard
export {
    CompletedAvatar,
    OrderCardHeader
}