// React
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip, useTheme } from '@mui/material'
import React from 'react'

// MUI Icons
import LaunchIcon from '@mui/icons-material/Launch';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckIcon from '@mui/icons-material/Check';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import local from '../../api/local';
import AddDocumentDialog from '../../dialog/AddDocumentDialog';

function ManifestActions(props) {
    let { id } = useParams()
    const {
        manifestId,
        complete,
        loadCount,
        setLoadCount
    } = props

    async function handleComplete() {
        await local.manifests.complete(manifestId)
    }

    const [open, setOpen] = React.useState(false)
    const [reloadProcessed, setReloadProcessed] = React.useState(true)

    React.useEffect(() => {
        if (setLoadCount && !reloadProcessed && !open) {
            setLoadCount(loadCount + 1)
        }
    }, [loadCount, setLoadCount, open, reloadProcessed])

    if (!id) {
        return (
            <CardActions>
                <Box sx={{flexGrow: 1}} />
                <Tooltip
                    title="Open"
                >
                    <Link to={`/manifests/${manifestId}`}>
                        <IconButton>
                            <LaunchIcon fontSize="large" />
                        </IconButton>
                    </Link>
                </Tooltip>
            </CardActions>
        )
    }
    return (
        <CardActions>
            <Tooltip
                title="Mark Completed"
            >
                <IconButton
                    disabled={complete}
                    onClick={handleComplete}
                >
                    <TaskAltIcon fontSize='large' />
                </IconButton>
            </Tooltip>
            <Box sx={{flexGrow: 1}} />
            <Tooltip
                title="Add Document"
            >
                <IconButton
                    disabled={complete}
                    onClick={() => {setReloadProcessed(false); setOpen(true)}}
                >
                    <DocumentScannerIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <AddDocumentDialog
                open={open}
                reopen={() => setOpen(true)}
                close={() => setOpen(false)}
                manifestId={manifestId}
            />
        </CardActions>
    )
}


function ManifestCard(props) {
    const {
        id,
        complete,
        setLoadCount,
        loadCount
    } = props

    const theme = useTheme()

    return (
        <Grid
            item
            xs={12}
        >
            <Card>
                <CardHeader
                    title={id}
                    avatar={
                        <Avatar
                            sx={{
                                color: complete ? theme.palette.success : theme.palette.error
                            }}
                        >
                            {
                                complete ?
                                <CheckIcon fontSize="large" />
                                :
                                <PriorityHighIcon fontSize="large" />
                            }
                        </Avatar>
                    }
                />
                <ManifestActions
                    manifestId={id}
                    complete={complete}
                    loadCount={loadCount}
                    setLoadCount={setLoadCount}
                />
            </Card>
        </Grid> 
    )
}

export default ManifestCard