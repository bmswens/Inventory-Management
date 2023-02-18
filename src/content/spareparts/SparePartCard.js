// React
import React from 'react'

// MUI
import { Avatar, Box, Button, Card, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography, useTheme } from '@mui/material'

// MUI Icons
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

// react router
import { Link, useSearchParams } from 'react-router-dom'

// custom
import { SparePartsSearchContext } from './SpareParts'
import api from '../../api'
import EditPartDialog from './EditPartDialog'


function IssuePartsDialog(props) {
    const {
        open,
        close,
        quantity,
        setQuantity,
        name,
        bin,
        add
    } = props
    const [input, setInput] = React.useState('')

    function handleClose() {
        setInput('')
        close()
    }

    const isValid = !Number.isNaN(Number(input)) && Number(input) <= Number(quantity)

    async function submit() {
        let n = Number(input)
        if (add) {
            n = n * -1
        }
        let current = Number(quantity) - n
        await api.spareParts.update(bin, { quantity: current })
        setQuantity(current)
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
                    {add ? "Add To Stock" : "Issue Items"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    label="Name"
                    value={name}
                    disabled
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
                    sx={{ marginTop: 1 }}
                    label="In Stock"
                    value={quantity}
                    disabled
                />
                <TextField
                    fullWidth
                    sx={{ marginTop: 1 }}
                    required
                    error={Boolean(input && !isValid)}
                    label="Amount"
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
                    backgroundColor: quantity ? theme.palette.success.dark : theme.palette.error.dark
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

function SparePartsLink(props) {
    const { external } = props

    if (external) {
        return (
            <Link to={external} target="_blank">
                <Tooltip
                    title="More Info"
                >
                    <IconButton>
                        <InfoIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </Link>
        )
    }
    return (
        <Tooltip
            title="More Info"
        >
            <span>
                <IconButton
                    disabled={true}
                >
                    <InfoIcon fontSize='large' />
                </IconButton>
            </span>
        </Tooltip>
    )
}

function SparePartActions(props) {
    const {
        external,
        quantity,
        setQuantity,
        bin,
        name,
        unit,
    } = props

    // dialog states
    const [editOpen, setEditOpen] = React.useState(false)
    const [addOpen, setAddOpen] = React.useState(false)
    const [issueOpen, setIssueOpen] = React.useState(false)

    function close() {
        setEditOpen(false)
        setAddOpen(false)
        setIssueOpen(false)
    }

    // open on search
    const [params] = useSearchParams()

    React.useEffect(() => {
        if (bin && params.get("bin") === bin) {
            setIssueOpen(true)
        }
    }, [params, bin])

    return (
        <>
            <CardActions>
                <SparePartsLink external={external} />
                <Tooltip
                    title="Edit"
                >
                    <IconButton
                        onClick={() => setEditOpen(true)}
                    >
                        <EditIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Box sx={{ flexGrow: 1 }} />
                <Tooltip
                    title="Add To Stock"
                >
                    <IconButton
                        onClick={() => setAddOpen(true)}
                    >
                        <AddShoppingCartIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title="Issue Items"
                >
                    <IconButton
                        onClick={() => setIssueOpen(true)}
                    >
                        <ShoppingCartCheckoutIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </CardActions>
            <EditPartDialog
                open={editOpen}
                close={close}
                quantity={quantity}
                setQuantity={setQuantity}
                name={name}
                bin={bin}
                unit={unit}
                external={external}
            />
            <IssuePartsDialog
                add
                open={addOpen}
                close={close}
                quantity={quantity}
                setQuantity={setQuantity}
                name={name}
                bin={bin}
            />
            <IssuePartsDialog
                open={issueOpen}
                close={close}
                quantity={quantity}
                setQuantity={setQuantity}
                name={name}
                bin={bin}
            />
        </>
    )

}


function SparePartCard(props) {

    const {
        quantity,
        name,
        bin,
        external,
        unit
    } = props

    // state
    const [stateQuantity, setStateQuantity] = React.useState(quantity)

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
                <SparePartActions
                    quantity={stateQuantity}
                    setQuantity={setStateQuantity}
                    name={name}
                    bin={bin}
                    external={external}
                    unit={unit}
                />
            </Card>
        </Grid>
    )
}

export default SparePartCard