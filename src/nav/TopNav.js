// React
import React from 'react'

// MUI
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

function TopNav(props) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
            >
                <Toolbar>
                    <Typography
                        variant="h4"
                    >
                        Inventory Management
                    </Typography>
                    <Box sx={{flexGrow: 1}} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopNav