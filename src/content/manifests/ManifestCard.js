// React
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'
import React from 'react'

// MUI Icons
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckIcon from '@mui/icons-material/Check';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../api';
import AddDocumentDialog from '../../dialog/AddDocumentDialog';

function ManifestActions(props) {
    let { id } = useParams()
    const {
        manifestId,
        complete,
        loadCount,
        setLoadCount,
        docs
    } = props

    async function handleComplete() {
        await api.manifests.complete(manifestId)
    }

    const [open, setOpen] = React.useState(false)
    const [reloadProcessed, setReloadProcessed] = React.useState(true)

    React.useEffect(() => {
        if (setLoadCount && !reloadProcessed && !open) {
            setLoadCount(loadCount + 1)
        }
    }, [loadCount, setLoadCount, open, reloadProcessed])

    async function copyToClipboard() {
        let output = []
        for (let id of docs) {
            let line = await api.documents.makeBatchLine(id)
            output.push(line)
        }
        let text = output.join('\n')
        navigator.clipboard.writeText(text)
    }

    async function download() {
        let output = []
        for (let id of docs) {
            let line = await api.documents.makeBatchLine(id)
            output.push(line)
        }
        let text = output.join('\n')
        let blob = new Blob([text])
        let url = window.URL.createObjectURL(blob)
        let div = document.createElement('a')
        div.style.display = "none"
        div.href = url
        div.download = 'batch.txt'
        // document.body.appendChild(div)
        div.click()
        window.URL.revokeObjectURL(url)
    }

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
            <Tooltip
                title="Copy Batch File Contents"
            >
                <IconButton
                    onClick={copyToClipboard}
                >
                    <ContentCopyIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Tooltip
                title="Download Batch File"
            >
                <IconButton
                    onClick={download}
                >
                    <DownloadIcon fontSize="large" />
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
        loadCount,
        docs
    } = props

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
                                bgcolor: complete ? "green" : "darkred"
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
                    docs={docs}
                />
            </Card>
        </Grid> 
    )
}

export default ManifestCard