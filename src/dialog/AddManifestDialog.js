// React
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'
import api from '../api'


function AddManifestDialog(props) {
    const { open, close } = props
    const [id, setId] = React.useState('')
    const navigate = useNavigate()

    async function submit() {
        await api.manifests.add(id)
        navigate(`/manifests/${id}`)
        handleClose()
    }

    function handleClose() {
        setId('')
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            scroll="body"
        >
            <DialogTitle align="center">Add A Manifest</DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    <TextField
                        fullWidth
                        label="Manifest ID"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={!id}
                    variant="contained"
                    onClick={submit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default AddManifestDialog