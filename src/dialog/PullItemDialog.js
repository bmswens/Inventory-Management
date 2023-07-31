// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, MenuItem } from '@mui/material';

function PullItemDialog(props) {

    const {
        open,
        close
    } = props

    const qtyUnitOptions = [
        { value: 'EA', label: 'Each' },
        { value: 'KT', label: 'Kit' },
        { value: 'FT', label: 'Feet' },
        { value: 'HD', label: 'Hundred' },
        { value: 'RL', label: 'Roll' },
        { value: 'CN', label: 'CAN' },
        { value: 'BX', label: 'Box' },
    ];

    const [name, setName] = React.useState('')
    const [nsnItem, setNsnItem] = React.useState('')
    const [qty, setQty] = React.useState('')
    const [qtyUnit, setQtyUnit] = React.useState('')
    const [qtyToBin, setQtyToBin] = React.useState('')
    const [shipFrom, setShipFrom] = React.useState('')
    const [shipTo, setShipTo] = React.useState('')

    function handleClose() {
        setName('')
        setNsnItem('')
        setQty('')
        setQtyToBin('')
        setShipFrom('')
        setShipTo('')
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle align="center">
                Pull Item
            </DialogTitle>
            <DialogContent>
                <Stack
                    style={{marginTop: "6px"}}
                    spacing={1.5}
                    alignItems="center"
                >
                    <TextField
                        fullWidth
                        label="Name/Nomenclature"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="NSN Item"
                        value={nsnItem}
                        onChange={event => setNsnItem(event.target.value)}
                    />

                    <Stack 
                        spacing={1}
                        direction="row"
                        width="100%"
                    >
                        <TextField
                            fullWidth
                            label="Qty"
                            value={qty}
                            onChange={event => setQty(event.target.value)}
                        />

                        <TextField 
                            fullWidth
                            select
                            label="Quantity Unit"
                            value={qtyUnit} 
                            onChange={(event) => {
                                setQtyUnit(event.target.value);
                            }}
                        >
                            {qtyUnitOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <TextField
                        fullWidth
                        label="Qty to Bin"
                        value={qtyToBin}
                        onChange={event => setQtyToBin(event.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Ship From"
                        value={shipFrom}
                        onChange={event => setShipFrom(event.target.value)}
                    />

                    <TextField
                        fullWidth
                        label="Ship To"
                        value={shipTo}
                        onChange={event => setShipTo(event.target.value)}
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
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default PullItemDialog