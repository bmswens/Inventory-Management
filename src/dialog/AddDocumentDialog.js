// React
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React from 'react'

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import BarcodeDialog from './BarcodeDialog';
import local from '../api/local';

function isValidDocID(text) {
    if (!text) {
        return false
    }
    if (text.length !== 15) {
        return false
    }
    return true
}

function isValidNSN(text) {
    if (text.length !== 13 && text.length !== 15) {
        return false
    }
    return true
}

function isValidThird(text) {
    if (text.length !== 17) {
        return false
    }
    return true
}

function AddDocumentDialog(props) {
    const {
        open,
        close,
        reopen,
        manifestId
    } = props

    const [dialogProps, setDialogProps] = React.useState({})
    const [scannerOpen, setScannerOpen] = React.useState(false)

    const [docId, setDocId] = React.useState('')
    const [nsn, setNsn] = React.useState('')
    const [unit, setUnit] = React.useState('')
    const [quantity, setQuantity] = React.useState('')
    const [condition, setCondition] = React.useState('')
    const [distribution, setDistribution] = React.useState('')
    const [money, setMoney] = React.useState('')

    function handleScanDoc() {
        setDialogProps({
            validate: isValidDocID,
            callback: text => {
                setDocId(text)
                reopen()
            }
        })
        close()
        setScannerOpen(true)
    }

    function handleScanNsn() {
        setDialogProps({
            validate: isValidNSN,
            callback: text => {
                setNsn(text)
                reopen()
            }
        })
        close()
        setScannerOpen(true)
    }

    function handleScanThird() {
        setDialogProps({
            validate: isValidThird,
            callback: text => {
                setUnit(text.slice(0, 2))
                setQuantity(text.slice(2, 7))
                setCondition(text.slice(7, 8))
                setDistribution(text.slice(8, 10))
                let dollars = text.slice(10, 15)
                let cents = text.slice(15)
                let m = `${dollars}.${cents}`
                setMoney(m)
                reopen()
            }
        })
        close()
        setScannerOpen(true)
    }

    async function submit() {
        await local.documents.add({
            id: docId,
            nsn: nsn,
            unit: unit,
            quantity: quantity,
            condition: condition,
            distribution: distribution
        })
        await local.manifests.addDocument(manifestId, docId)
        reset()
    }

    function reset() {
        setDocId('')
        setNsn('')
        setUnit('')
        setQuantity('')
        setDistribution('')
        setCondition('')
        setMoney('')
    }

    function handleClose() {
        reset()
        close()
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                scroll="body"
            >
                <DialogTitle align="center">
                    Add A Document
                </DialogTitle>
                <DialogContent>
                    <Stack
                        spacing={1}
                        sx={{marginTop: 1}}
                    >
                        <Button
                            disabled={Boolean(docId)}
                            fullWidth
                            variant="contained"
                            endIcon={<QrCodeScannerIcon />}
                            onClick={handleScanDoc}
                        >
                            Scan Document ID
                        </Button>
                        <TextField
                            fullWidth
                            disabled
                            label="Document ID"
                            value={docId}
                        />
                        <Button
                            disabled={Boolean(nsn)}
                            fullWidth
                            variant="contained"
                            endIcon={<QrCodeScannerIcon />}
                            onClick={handleScanNsn}
                        >
                            Scan NSN
                        </Button>
                        <TextField
                            fullWidth
                            disabled
                            label="NSN"
                            value={nsn}
                        />
                        <Button
                            disabled={Boolean(unit)}
                            fullWidth
                            variant="contained"
                            endIcon={<QrCodeScannerIcon />}
                            onClick={handleScanThird}
                        >
                            Scan Third Barcode
                        </Button>
                        <TextField
                            fullWidth
                            disabled
                            label="Unit of Measure"
                            value={unit}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Quantity"
                            value={quantity}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Condition"
                            value={condition}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="distribution"
                            value={distribution}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Cost"
                            value={money}
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
                        variant="contained"
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <BarcodeDialog
                open={scannerOpen}
                close={() => setScannerOpen(false)}
                {...dialogProps}
            />
        </>
    )
}

export default AddDocumentDialog