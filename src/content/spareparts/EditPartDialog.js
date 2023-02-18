// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

// custom
import api from '../../api'

function EditPartDialog(props) {
    const {
        name,
        unit,
        quantity,
        bin,
        external,
        open,
        close
    } = props

    const [inputName, setInputName] = React.useState(name)
    const [inputUnit, setInputUnit] = React.useState(unit)
    const [inputQuantity, setInputQuantity] = React.useState(quantity)
    const [inputExternal, setInputExternal] = React.useState(external)

    function handleClose() {
        setInputName(name)
        setInputUnit(unit)
        setInputQuantity(quantity)
        setInputExternal(external)
        close()
    }

    async function submit() {
        await api.spareParts.update(bin, {
            name: inputName,
            unit: inputUnit,
            quantity: Number(inputQuantity),
            external: inputExternal
        })
        handleClose()
    }

    const quantityValid = !Number.isNaN(Number(inputQuantity)) && Number(inputQuantity) >= 0

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                Edit Item
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    label="Name"
                    value={inputName}
                    onChange={event => setInputName(event.target.value)}
                />
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    label="Unit"
                    value={inputUnit}
                    onChange={event => setInputUnit(event.target.value)}
                />
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    label="Bin"
                    value={bin}
                    disabled
                />
                <TextField
                    fullWidth
                    error={!quantityValid}
                    sx={{ marginTop: 1 }}
                    label="Quantity"
                    value={inputQuantity}
                    onChange={event => setInputQuantity(event.target.value)}
                />
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    label="External Link"
                    value={inputExternal}
                    onChange={event => setInputExternal(event.target.value)}
                />
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
                    onClick={submit}
                    disabled={!quantityValid}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditPartDialog