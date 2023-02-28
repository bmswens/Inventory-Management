// React
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React from 'react'

// MUI

function ItemInfoDialog(props) {

    const { open, close } = props

    let toDisplay = [
        {
            key: "name",
            label: "Name"
        },
        {
            key: "nsn",
            label: "NSN"
        },
        {
            key: "location",
            label: "Location"
        },
        {
            key: "svcBal",
            label: "Service Balance"
        },
        {
            key: "cost",
            label: "Cost"
        },
        {
            key: "unit"
        },
        {
            key: "errc"
        },
        {
            key: "tcc"
        },
        {
            key: "hhf"
        },
        {
            key: "dmdLvl"
        },
        {
            key: "di"
        },
        {
            key: "do"
        },
        {
            key: "doli"
        },
        {
            key: "dolt"
        },
        {
            key: "frzCode"
        }
    ]

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={open}
            onClose={close}
            scroll="body"
        >
            <DialogTitle
                textAlign="center"
            >
                Item Info
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    {toDisplay.map(obj => 
                        <TextField
                            fullWidth
                            disabled
                            value={props[obj.key]}
                            label={obj.label ? obj.label : obj.key}
                        />
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={close}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ItemInfoDialog