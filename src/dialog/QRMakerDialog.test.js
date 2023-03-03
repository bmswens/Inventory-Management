// testing help
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createElement } from 'react'

// to test
import QRMakerDialog from './QRMakerDialog'

describe('<QRMakerDialog>', function () {
    it("should be able to close", function () {
        let close = jest.fn()
        render(
            <QRMakerDialog
                open={true}
                close={close}
            />
        )
        let button = screen.getByRole("button", { name: "Close" })
        userEvent.click(button)
        expect(close).toHaveBeenCalled()
    })
    it("should be able to be assigned data from the start", function () {
        let predefined = "unique data"
        render(
            <QRMakerDialog
                open={true}
                close={jest.fn()}
                data={predefined}
            />
        )
        let text = screen.getByText(predefined)
        expect(text).not.toBeNull()
    })
    it("should allow the user to download the image", function () {
        // We have to render a canvas to make up for mocking 
        // the react-qrcode-logo component
        let predefined = "unique data"
        render(
            <>
                <QRMakerDialog
                    open={true}
                    close={jest.fn()}
                    data={predefined}
                />
                <canvas id="react-qrcode-logo" />
            </>
        )
        let button = screen.getByRole("button", { name: "Download" })
        userEvent.click(button)
        let link = document.getElementById("qr-code-download")
        expect(link.download).toEqual("qrcode.png")
    })
    it("Should allow the user to create their own QR code", function() {
        render(
            <QRMakerDialog
                open={true}
                close={jest.fn()}
            />
        )
        let textBox = screen.getByRole("textbox")
        userEvent.type(textBox, "My Cool Data")
    })
})