// React
import React from 'react'

// MUI
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import QrReader from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'


function CameraDialog(props) {

    const { open, close } = props
    const navigate = useNavigate()

    function handleResult(result) {
        if (!!result) {
            console.log(result)
            try {
                let data = JSON.parse(result)
                if (data.nsn) {
                    navigate(`/items/${data.nsn}`)
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
        </Dialog>
    )
}

export default CameraDialog