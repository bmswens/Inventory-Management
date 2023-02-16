// React
import React from 'react'

// MUI
import { Avatar, Box, Button, Card, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip, useTheme } from '@mui/material'

// react router
import { useSearchParams } from 'react-router-dom'

function IssuePartsDialog(props) {
    const {open, close, quantity, setQuantity} = props
    const [input, setInput] = React.useState('')

    function handleClose() {
        setInput('')
        close()
    }


    const isValid = !Number.isNaN(Number(input)) && Number(input) <= Number(quantity)

    function submit() {
        setQuantity(Number(quantity) - Number(input))
        handleClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle
                align="center"
            >
                Issue Items
            </DialogTitle>
            <DialogContent>
                <TextField
                    sx={{marginTop: 1}}
                    required
                    error={Boolean(input && !isValid)}
                    label="Quantity"
                    value={input}
                    onChange={event => setInput(event.target.value)}
                    helperText="Must be a whole number."
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
                    disabled={!input || !isValid}
                    onClick={submit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function QuantityAvatar(props) {

    const { quantity } = props
    const theme = useTheme()
    return (
        <Tooltip
            title="Quantity Count"
        >
            <Avatar
                sx={{
                    backgroundColor: quantity ?  theme.palette.success.dark : theme.palette.error.dark
                }}
                alt="quantity"
            >   
                {quantity}
            </Avatar>
        </Tooltip>
    )
}

function SparePartHeader(props) {
    const {
        quantity,
        name,
        bin
    } = props
    
    return (
        <CardHeader
            avatar={<QuantityAvatar quantity={quantity} />}
            title={name}
            subheader={`Bin: ${bin}`}
        />
    )
}


function SparePartCard(props) {

    const {
        quantity,
        name,
        bin
    } = props

    // state
    const [stateQuantity, setStateQuantity] = React.useState(quantity)
    const [open, setOpen] = React.useState(false)

    const [params] = useSearchParams()

    React.useEffect(() => {
        if (bin && params.get("bin") === bin) {
            setOpen(true)
        }
    }, [params, bin])

    return (
        <Grid item xs={12}>
            <Card>
                <SparePartHeader
                    quantity={stateQuantity}
                    name={name}
                    bin={bin}
                />
                <CardActions>
                    <Box sx={{"flexGrow": 1}} />
                    <Button
                        variant="contained"
                        onClick={() => setOpen(true)}
                    >
                        Issue
                    </Button>
                </CardActions>
            </Card>
            <IssuePartsDialog
                open={open}
                close={() => setOpen(false)}
                quantity={stateQuantity}
                setQuantity={setStateQuantity}
            />
        </Grid>
    )
}

export default SparePartCard