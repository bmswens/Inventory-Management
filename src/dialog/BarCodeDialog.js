// React
import React from 'react'

// MUI
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useNavigate } from 'react-router-dom'


function BarcodeDialog(props) {

    const { open, close, callback } = props
    const [stopStream, setStopStream] = false
    const navigate = useNavigate()

    function handleResult(err, result) {
        if (!!result) {
            console.log(result)
            try {
                let data = JSON.parse(result)
                if (callback) {
                    callback(data)
                    handleClose()
                }
                else if (data.name) {
                    navigate(`/orders/${data.name}`)
                    handleClose()
                }
                else if (data.nsn) {
                    navigate(`/items/${data.nsn}`)
                    handleClose()
                }
            }
            catch {

            }
        }
    }

    function handleClose() {
        setStopStream(true)
        setTimeout(() => close(), 0)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
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
                <BarcodeScannerComponent
                    width="100%"
                    height="auto"
                    onUpdate={handleResult}
                    stopStream={stopStream}
                />
            </DialogContent>
        </Dialog>
    )
}

export default BarcodeDialog