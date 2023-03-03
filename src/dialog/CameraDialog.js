// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import QrReader from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'


function CameraDialog(props) {

    const { open, close, callback } = props
    const navigate = useNavigate()

    function handleResult(result) {
        if (!!result) {
            console.log(result)
            try {
                let data = JSON.parse(result)
                if (callback) {
                    callback(data)
                    close()
                }
                else if (data.name) {
                    navigate(`/orders/${data.name}`)
                    close()
                }
                else if (data.nsn) {
                    navigate(`/items/${data.nsn}`)
                    close()
                }
                else if (data.bin && data.route === "spare-parts") {
                    navigate(`/spare-parts?bin=${data.bin}`)
                    close()
                }
            }
            catch {

            }
        }
    }

    function handleError(error) {

    }

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
            maxWidth="md"
            scroll="body"
        >
            <DialogTitle
                align='center'
                variant='h4'
            >
                QR Scanner
            </DialogTitle>
            <DialogContent>
                {open ?
                    <QrReader
                        style={{ 
                            width: '100%',
                            height: "auto"
                         }}
                        onScan={handleResult}
                        onError={handleError}
                        facingMode="environment"
                    />
                    :
                    null
                }
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                    variant="contained"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CameraDialog