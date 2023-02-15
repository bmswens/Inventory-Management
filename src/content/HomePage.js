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

// custom
import CameraDialog from '../dialog/CameraDialog'


function AppButton(props) {

    const {
        disabled,
        icon,
        title,
        link,
        size,
        external
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

function HomePage(props) {

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
                disabled
                title="Pull"
                icon={<DownloadIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                title="Put Away"
                icon={<ExitToAppIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                title="Move"
                icon={<MoveDownIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                title="In Check"
                icon={<TaskAltIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                title="Deliver"
                icon={<VerifiedUserIcon sx={{ fontSize: "20vmin" }} />}
            />
            <AppButton
                disabled
                title="Ship"
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
        </Grid>

    )
}

export default HomePage