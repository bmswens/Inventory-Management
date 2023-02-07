// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'

// MUI Icons
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'

// custom
import CameraDialog from '../dialog/CameraDialog'
import { Link } from 'react-router-dom'

function QRButton(props) {
    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }
    return (
        <>
            <Tooltip
                title="QR Scanner"
            >
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <QrCodeScannerIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <CameraDialog
                open={open}
                close={close}
            />
        </>
    )
}

function TopNav(props) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
            >
                <Toolbar>
                    <Link to="/" style={{textDecoration: "none", color: "inherit"}}>
                        <Typography
                            variant="h4"
                        >
                            Inventory Management
                        </Typography>
                    </Link>
                    <Box sx={{flexGrow: 1}} />
                    <QRButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopNav