// React
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack, TextField } from '@mui/material'
import React from 'react'

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import BarcodeDialog from './BarcodeDialog';
import local from '../api/local';

function handle7Q(text) {
    return [text.match(/\d*/)[0], text.match(/\D.*/)[0]]
}

function getPDF417Data(text) {
    const identifiers = {
        "12S": "docId",
        "N": "nsn",
        "7Q": "unit",
        "B6": "distribution",
        "2R": "condition",
        "12Q": "money",
        "38": "name",
        "32": "delivery"
    }
    for (let identifier in identifiers) {
        if (text.startsWith(identifier)) {
            return [identifiers[identifier], text.replace(identifier, '')]
        }
    }
    return []
}

function clean(text) {
    let output = []
    let newString = ''
    text = text.replace('[)>', '')
    console.log(text)
    for (let char of text) {
        if (char.match(/[\w,,,., ]/g)) {
            newString += char
        }
        else {
            if (newString) {
                output.push(newString)
            }
            newString = ''
        }
    }
    return output
}

const emptyData = {
    docId: '',
    nsn: '',
    weight: '',
    micap: false,
    actualQuantity: '',
    location: '',
    unit: '',
    quantity: '',
    condition: '',
    distribution: '',
    money: ''
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

    const [scan, setScan] = React.useState('')
    const [data, setData] = React.useState(emptyData)

    function handleScanDoc() {
        setDialogProps({
            validate: null,
            callback: text => {
                text = clean(text)
                let d = {}
                for (let t of text) {
                    let resp = getPDF417Data(t)
                    if (!resp.length) {
                        continue
                    }
                    let [key, value] = resp
                    if (key === "unit") {
                        let [quantity, unit] = handle7Q(value)
                        d.quantity = quantity
                        d.unit = unit
                    }
                    else {
                        d[key] = value
                    }
                }
                console.log(d)
                setData(d)
                reopen()
            }
        })
        close()
        setScannerOpen(true)
    }

    async function submit() {
        data.id = data.docId
        console.log(data)
        await local.documents.add(data)
        await local.manifests.addDocument(manifestId, data.docId)
        reset()
    }

    function reset() {
        setScan('')
        setData(emptyData)
    }

    function handleClose() {
        reset()
        close()
    }

    React.useEffect(() => {
        if (scan) {
            let text = scan
            let d = {}
            d.unit = text.slice(0, 2)
            d.quantity = text.slice(2, 7)
            d.actualQuantity = d.quantity
            d.condition = text.slice(7, 8)
            d.distribution = text.slice(8, 10)
            let dollars = text.slice(10, 15)
            let cents = text.slice(15)
            let m = `${dollars}.${cents}`
            d.money = m
            setData({ ...data, ...d })
        }
    }, [scan, data])

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
                        sx={{ marginTop: 1 }}
                    >
                        <Button
                            disabled={Boolean(data.docId)}
                            fullWidth
                            variant="contained"
                            endIcon={<QrCodeScannerIcon />}
                            onClick={handleScanDoc}
                        >
                            Scan Document
                        </Button>
                        <TextField
                            fullWidth
                            label="Document ID"
                            helperText="First Barcode"
                            value={data.docId}
                            onChange={event => setData({ ...data, docId: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="NSN"
                            helperText="Second Barcode"
                            value={data.nsn}
                            onChange={event => setData({ ...data, nsn: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Third Barcode"
                            value={scan}
                            onChange={event => setScan(event.target.value.trim())}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Unit of Measure"
                            helperText="Autocompleted from third barcode."
                            value={data.unit}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Quantity"
                            helperText="Autocompleted from third barcode."
                            value={data.quantity}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Condition"
                            helperText="Autocompleted from third barcode."
                            value={data.condition}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Distribution"
                            helperText="Autocompleted from third barcode."
                            value={data.distribution}
                        />
                        <TextField
                            fullWidth
                            disabled
                            label="Cost"
                            helperText="Autocompleted from third barcode."
                            value={data.money}
                        />
                        <TextField
                            fullWidth
                            label="Weight"
                            value={data.weight}
                            onChange={event => setData({ ...data, weight: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Actual Quantity Recieved"
                            value={data.actualQuantity}
                            onChange={event => setData({ ...data, actualQuantity: event.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Temp Location"
                            value={data.location}
                            onChange={event => setData({ ...data, location: event.target.value })}
                        />
                        <Stack direction="row" spacing={1} sx={{ display: "flex" }}>
                            <Box sx={{ flexGrow: 1 }} />
                            <FormControlLabel
                                label="MICAP"
                                labelPlacement='start'
                                control={
                                    <Checkbox
                                        value={data.micap}
                                        onChange={event => setData({ ...data, micap: event.target.checked })}
                                    />
                                }
                            />
                        </Stack>
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