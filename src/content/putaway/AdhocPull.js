function PullCard(props) {
    const {
        name,
        completed,
        nsn,
        quantityToPull,
        sourceBin
    } = props

    const {
        location
    } = api.items.getByNSN(nsn)

    const [scannedData, setScannedData] = React.useState({})

    return (
        <Grid item xs={12}>
            <Card>
                <OrderCardHeader
                    name={name}
                    nsn={nsn}
                    completed={completedDisplay}
                />
                <PullCardBody
                    location={location}
                    quantity={quantityToPull}
                    sourceBin={sourceBin}
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
                        name="Scan Source Bin"
                        targetKey="bin"
                        targetValue={sourceBin}
                        scannedData={scannedData}
                        callback={(key) => setScannedData({...scannedData, [key]: true})}
                    />
                </CardActions>
            </Card>
        </Grid>
    )
}
