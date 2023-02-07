// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'
import { Box } from '@mui/system'

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
            <Grid item xs={6} lg={3}>
                <Box
                    component="img"
                    src={process.env.PUBLIC_URL + "/img/qr/Bin34.png"}
                    sx={{
                        maxHeight: "192px"
                    }}
                />
            </Grid>
            <Grid item xs={6} lg={3}>
                <Box
                    component="img"
                    src={process.env.PUBLIC_URL + "/img/qr/Order13482312.png"}
                    sx={{
                        maxHeight: "192px"
                    }}
                />
            </Grid>
            <Grid item xs={6}lg={3}>
                <Box
                    component="img"
                    src={process.env.PUBLIC_URL + "/img/qr/Order13489455.png"}
                    sx={{
                        maxHeight: "192px"
                    }}
                />
            </Grid>
            <Grid item xs={6} lg={3}>
                <Box
                    component="img"
                    src={process.env.PUBLIC_URL + "/img/qr/FuseBin.png"}
                    sx={{
                        maxHeight: "192px"
                    }}
                />
            </Grid>
            <Grid item xs={6} lg={3}>
                <Box
                    component="img"
                    src={process.env.PUBLIC_URL + "/img/qr/StudBin.png"}
                    sx={{
                        maxHeight: "192px"
                    }}
                />
            </Grid>
        </Grid>
        
    )
}

export default HomePage