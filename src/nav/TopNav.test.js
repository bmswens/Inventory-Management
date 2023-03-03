// testing help
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// to test
import TopNav from './TopNav'

describe('<TopNav>', function() {
    it("should open the QR scanner dialog", function() {
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Open QR Scanner"})
        userEvent.click(button)
        let dialog = screen.getByRole("dialog")
        expect(dialog).not.toBeNull()
        let closeButton = screen.getByRole("button", { name: "Close"})
        userEvent.click(closeButton)
    }) 
})