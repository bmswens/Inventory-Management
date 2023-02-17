// React
import React from 'react'

// MUI
import { Avatar, Box, Button, Card, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Tooltip, Typography, useTheme } from '@mui/material'

// react router
import { useSearchParams } from 'react-router-dom'

// custom
import { SparePartsSearchContext } from './SpareParts'

function IssuePartsDialog(props) {
    const {
        open, 
        close, 
        quantity, 
        setQuantity, 
        name,
        bin
    } = props
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
            maxWidth="md"
            fullWidth
        >
            <DialogTitle
                align="center"
            >
                <Typography variant="h4">
                    Issue Items
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    sx={{marginTop: 1}}
                    label="Name"
                    value={name}
                    disabled
                />
                <TextField
                    fullWidth
                    sx={{marginTop: 1}}
                    label="Bin"
                    value={bin}
                    disabled
                />
                <TextField
                    fullWidth
                    sx={{marginTop: 1}}
                    label="In Stock"
                    value={quantity}
                    disabled
                />
                <TextField
                    fullWidth
                    sx={{marginTop: 1}}
                    required
                    error={Boolean(input && !isValid)}
                    label="Issue Amount"
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

    // search 
    const context = React.useContext(SparePartsSearchContext)
    if (context.text) {
        let text = context.text.toLowerCase()
        let lName = name.toLowerCase()
        let lBin = bin.toLowerCase()
        if (!lName.includes(text) && !lBin.includes(text)) {
            return null
        }
    }

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
                name={name}
                bin={bin}
            />
        </Grid>
    )
}

export default SparePartCard