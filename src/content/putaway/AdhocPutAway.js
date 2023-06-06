function PutAwayCard(props) {
    const {
        name,
        completed,
        nsn,
        quantityToBin,
        finalBin
    } = props

    const {
        location
    } = api.items.getByNSN(nsn)

    const [scannedData, setScannedData] = React.useState({})

    // ...

    return (
        <Grid item xs={12}>
            <Card>
                <OrderCardHeader
                    name={name}
                    nsn={nsn}
                    completed={completedDisplay}
                />
                <PutAwayCardBody
                    location={location}
                    quantity={quantityToBin}
                    finalBin={finalBin}
                />
                <CardActions>
                    <ScanButton
                        name="Scan Item"
                        targetKey="nsn"
                        targetValue={nsn}
                        scannedData={scannedData}
                        callback={(key) => setScannedData({...scannedData, [key]: true})}
                    />
                    <Box sx={{flexGrow: 1}} />
                    <ScanButton
                        name="Scan Final Bin"
                        targetKey="bin"
                        targetValue={finalBin}
                        scannedData={scannedData}
                        callback={(key) => setScannedData({...scannedData, [key]: true})}
                    />
                </CardActions>
            </Card>
        </Grid>
    )
}

function ScanButton(props) {
    const {
        targetKey,
        targetValue,
        name,
        callback,
        scannedData
    } = props

    const [open, setOpen] = React.useState(false)

    function dialogCallback(data) {
        if (!data[targetKey]) {
            alert("Invalid QR code!")
        }
        else if (data[targetKey] !== targetValue) {
            console.log(data)
            console.log(targetValue)
            alert("Wrong target!")
        }
        else if (data[targetKey] === targetValue) {
            callback(targetKey)
        }
    }

    return (
        <>
            <Button
                variant="contained"
                disabled={scannedData[targetKey]}
                endIcon={scannedData[targetKey] ? <CheckIcon /> : <QrCodeScannerIcon />}
                onClick={() => setOpen(true)}
            >
                {name}
            </Button>
            <CameraDialog
                open={open}
                close={() => setOpen(false)}
                callback={dialogCallback}
            />
        </>
    )
}
