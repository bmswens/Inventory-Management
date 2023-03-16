// React
import React from 'react'

// MUI
import { Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'

// react router
import { Link } from 'react-router-dom'

// MUI icons
import DownloadIcon from '@mui/icons-material/Download'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import MoveDownIcon from '@mui/icons-material/MoveDown'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import SearchIcon from '@mui/icons-material/Search'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import SettingsIcon from '@mui/icons-material/Settings'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns'
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant'
import ConstructionIcon from '@mui/icons-material/Construction'
import QrCodeIcon from '@mui/icons-material/QrCode'

// custom
import CameraDialog from '../dialog/CameraDialog'
import QRMakerDialog from '../dialog/QRMakerDialog'
import AddManifestDialog from '../dialog/AddManifestDialog'


function AppButton(props) {

    const {
        disabled,
        icon,
        title,
        link,
        size,
        external,
        onClick
    } = props

    return (
        <Grid item xs={size ? size : 4} sx={{ display: "flex", justifyContent: "center" }}>
            <Link to={link || ""} style={{ textDecoration: "none", color: "inherit" }} target={external ? "_blank" : "_self"}>
                <Stack>
                    <Tooltip
                        title={disabled ? "Coming Soon!" : title}
                    >
                        <span>
                            <IconButton
                                disabled={disabled}
                                onClick={onClick}
                            >
                                {icon}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Typography align="center">
                        {title}
                    </Typography>
                </Stack>
            </Link>
        </Grid>
    )
}

function QRAppButton(props) {
    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }
    return (
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack>
                <Tooltip
                    title="QR Scanner"
                >
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <QrCodeScannerIcon sx={{ fontSize: "20vmin" }} />
                    </IconButton>
                </Tooltip>
                <Typography align="center">
                    QR Scanner
                </Typography>
                <CameraDialog
                    open={open}
                    close={close}
                />
            </Stack>
        </Grid>
    )
}

function QRMakerButton(props) {
    const [open, setOpen] = React.useState(false)
    function close() {
        setOpen(false)
    }
    return (
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Stack>
                <Tooltip
                    title="QR Maker"
                >
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <QrCodeIcon sx={{ fontSize: "20vmin" }} />
                    </IconButton>
                </Tooltip>
                <Typography align="center">
                    QR Maker
                </Typography>
                <QRMakerDialog
                    open={open}
                    close={close}
                />
            </Stack>
        </Grid>
    )
}

function HomePage(props) {

    const [manifestOpen, setManifestOpen] = React.useState(false)

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
            <AppButton
                link="https://www.youtube.com/watch?v=JUbykl3b4vM&ab_channel=BrandonSwenson"
                size={6}
                external
                title="View Demo"
                icon={<YouTubeIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                size={6}
                title="Interactive Demo"
                icon={<FollowTheSignsIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                link="/pull"
                title="Pull"
                icon={<DownloadIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                link="/put-away"
                title="Put Away"
                icon={<ExitToAppIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                title="Move"
                icon={<MoveDownIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                title="In Check"
                icon={<TaskAltIcon sx={{ fontSize: "20vmin" }} />}
                onClick={() => setManifestOpen(true)}
            />
            <AppButton
                disabled
                title="Deliver"
                icon={<VerifiedUserIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                title="Ship"
                link="/shipping/x"
                icon={<LocalShippingIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                link="/items"
                title="Asset Query"
                icon={<SearchIcon sx={{ fontSize: "20vmin" }} />}
            />
            <QRAppButton />
            <AppButton
                disabled
                title="Settings"
                icon={<SettingsIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                title="Bench Stock"
                icon={<TableRestaurantIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                link="/spare-parts"
                title="Spare Parts"
                icon={<ConstructionIcon sx={{ fontSize: "20vmin" }} />}
            />
            <QRMakerButton />
            <AddManifestDialog
                open={manifestOpen}
                close={() => setManifestOpen(false)}
            />
        </Grid>

    )
}

export default HomePage