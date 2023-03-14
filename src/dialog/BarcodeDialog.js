// React
import React from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

// React-Zxing
// lifesaver
import { useZxing } from "react-zxing";



function BarcodeDialog(props) {

    const { open, close, validate, callback } = props

    const { ref } = useZxing({
        onResult(result) {
            let text = result.getText().trim()
            console.log(text)
            if (validate) {
                let valid = validate(text)
                if (!valid) {
                    close()
                }
            }
            if (callback) {
                callback(text)
                close()
            }
        },
        paused: open === false,
        constraints: {
            video: {
                aspectRatio: {ideal: 1},
                facingMode: "environment",
                focusMode: "continuous"
            }
        }
    })

    return (
        <Dialog
            open={open}
            onClose={close}
            fullWidth
            maxWidth="md"
            scroll="body"
            disablePortal
        >
            <DialogTitle
                align='center'
                variant='h4'
            >
                Barcode Scanner
            </DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        position: "absolute",
                        left: "5%",
                        top: "50%",
                        width: "90%",
                        height: 100,
                        borderColor: "red",
                        border: "3px solid red"
                    }}
                />
                <video 
                    ref={ref}
                    style={{
                        width: "100%",
                        aspectRatio: "1/1"
                    }}
                />
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

export default BarcodeDialog