// React
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import React from 'react'

// MUI


// QR code
import { QRCode } from 'react-qrcode-logo';

function QRMakerDialog(props) {

    const {
        open,
        close,
        data
    } = props

    const [input, setInput] = React.useState(data || '')

    function handleClose() {
        setInput('')
        close()
    }

    function download() {
        const qrCodeCanvas = document.getElementById("react-qrcode-logo")
        const link = document.createElement('a')
        link.href = qrCodeCanvas.toDataURL()
        link.id = "qr-code-download"
        link.download = 'qrcode.png'
        link.display = "none"
        document.body.appendChild(link)
        link.click()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle align="center">
                QR Code Maker
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={2}
                    alignItems="center"
                >
                    <QRCode
                        value={input}
                        logoImage={process.env.PUBLIC_URL + "/arc.png"}
                        size={250}
                        logoHeight={250 * .3}
                        logoWidth={250 * .3}
                    />
                    <TextField
                        disabled={Boolean(data)}
                        fullWidth
                        label="Data"
                        multiline
                        rows={5}
                        value={input}
                        onChange={event => setInput(event.target.value)}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={download}
                >
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default QRMakerDialog