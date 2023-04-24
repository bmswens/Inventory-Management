// React
import React from 'react'

// MUI
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// custom
import api from '../../api'

function KitAutoCopmlete(props) {
    const { kit, selected, setSelected } = props

    // load items for autocomplete
    const [items, setItems] = React.useState([])
    React.useEffect(() => {
        async function load() {
            let i = await api.kit.getItemsByKit(kit)
            setItems(i)
        }
        load()
    }, [kit])

    return (
        <Autocomplete
            fullWidth
            options={items}
            getOptionLabel={option => `${option.nsn} - ${option.name}`}
            value={selected}
            onChange={(event, newValue) => setSelected(newValue)}
            renderInput={params => <TextField label="Item" {...params} />}
        />
    )
}


function HandleKitDialog(props) {
    const { open, onClose, kit, add } = props

    const [item, setItem] = React.useState(null)
    const [quantity, setQuantity] = React.useState('')
    const [issuedBy, setIssuedBy] = React.useState('')
    const [issuedTo, setIssuedTo] = React.useState('')

    async function submit() {
        if (add) {
            await api.kit.restock(kit, item, quantity)
        }
        else {
            await api.kit.issue(kit, item, quantity, issuedBy, issuedTo)
        }
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle align="center">
                {add ? "Restock Item" : "Issue Item"}
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    <KitAutoCopmlete
                        kit={kit}
                        selected={item}
                        setSelected={setItem}
                    />
                    <TextField
                        fullWidth
                        label="Quantity"
                        value={quantity}
                        onChange={event => setQuantity(event.target.value)}
                    />
                    { add ? null :
                    <>
                        <TextField
                            fullWidth
                            label="Issued By"
                            value={quantity}
                            onChange={event => setIssuedBy(event.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Issued To"
                            value={quantity}
                            onChange={event => setIssuedTo(event.target.value)}
                        />
                    </>
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={onClose}
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
    )
}

export default HandleKitDialog 