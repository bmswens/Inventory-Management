// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'

// MUI Icons
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import InventoryIcon from '@mui/icons-material/Inventory'
import RequestPageIcon from '@mui/icons-material/RequestPage'

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
                        <Tooltip
                            title="Home"
                        >
                            <IconButton>
                                <Box
                                    component="img"
                                    src={process.env.PUBLIC_URL + "/logo512.png"}
                                    sx={{
                                        height: "36px",
                                        width: "36px"
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link to="/items" style={{textDecoration: "none", color: "inherit"}}>
                        <Tooltip
                            title="Items"
                        >
                            <IconButton>
                                <InventoryIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Link to="/orders" style={{textDecoration: "none", color: "inherit"}}>
                        <Tooltip
                            title="Orders"
                        >
                            <IconButton>
                                <RequestPageIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Box sx={{flexGrow: 1}} />
                    <QRButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopNav