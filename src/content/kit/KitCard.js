// React
import React from 'react'

// MUI
import { Box, Card, CardActions, CardHeader, Grid } from '@mui/material'

// MUI Icons
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import OutboxIcon from '@mui/icons-material/Outbox'
import { Launch } from '@mui/icons-material'

// custom
import LabeledIconButton from '../../components/LabeledIconButton'
import HandleKitDialog from './HandleKitDialog'
import { Link } from 'react-router-dom'

function KitCard(props) {

    const {
        name,
        link
    } = props

    const [addOpen, setAddOpen] = React.useState(false)
    const [issueOpen, setIssueOpen] = React.useState(false)

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title={name}
                />
                <CardActions>
                    {link ?
                        <Link to={`/kit/${name}`}>
                            <LabeledIconButton
                                label="Go To Kit"
                            >
                                <Launch fontSize="large" />
                            </LabeledIconButton>
                        </Link>
                        :
                        null
                    }
                    <Box sx={{ flexGrow: 1 }} />
                    <LabeledIconButton
                        onClick={() => setAddOpen(true)}
                        label="Restock Item"
                    >
                        <MoveToInboxIcon fontSize="large" />
                    </LabeledIconButton>
                    <LabeledIconButton
                        onClick={() => setIssueOpen(true)}
                        label="Issue Item"
                    >
                        <OutboxIcon fontSize="large" />
                    </LabeledIconButton>
                </CardActions>
            </Card>
            <HandleKitDialog
                add
                open={addOpen}
                onClose={() => setAddOpen(false)}
            />
            <HandleKitDialog
                open={issueOpen}
                onClose={() => setIssueOpen(false)}
            />
        </Grid>
    )
}

export default KitCard