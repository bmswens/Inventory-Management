// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip, useTheme } from '@mui/material'

// MUI icons
import DoneIcon from '@mui/icons-material/Done'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'

// react router
import { Link } from 'react-router-dom'

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
            >   
                { completed ? <DoneIcon fontSize="large" /> : <QuestionMarkIcon fontSize="large" /> }
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
            title={name}
            subheader={`NSN: ${nsn}`}
        />
    )
}

function OrderCardActions(props) {
    
    const { name } = props

    return (
        <CardActions>
            <Box sx={{flexGrow: 1}} />
            <Tooltip
                title="View Details"
            >
                <Link to={`/orders/${name}`}>
                    <IconButton
                        aria-label="View Details"
                    >
                        <OpenInNewIcon fontSize='large' />
                    </IconButton>
                </Link>
            </Tooltip>
        </CardActions>
    )
}

function OrderCard(props) {

    const {
        completed,
        name,
        nsn
    } = props

    return (
        <Grid item xs={12} md={6} lg={3}>
            <Card>
                <OrderCardHeader
                    name={name}
                    nsn={nsn}
                    completed={completed}
                />
                <OrderCardActions
                    nsn={nsn}
                    name={name}
                    completed={completed}
                />
            </Card>
        </Grid>
    )

}

export default OrderCard