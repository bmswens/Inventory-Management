// testing help
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
// to test
import OrderCard from './OrderCard'


describe('<OrderCard> display', function () {
    it('should display the doc title', function () {
        render(
            <BrowserRouter>
                <OrderCard
                    name="Doc1"
                />
            </BrowserRouter>
        )
        let actual = screen.getByText(/DOC: Doc1/)
        expect(actual).not.toBeNull()
    })
    it('should display the NSN of the item', function () {
        render(
            <BrowserRouter><OrderCard
                nsn="5920014702312"
            /></BrowserRouter>
        )
        let actual = screen.getByText(/NSN: 5920014702312/)
        expect(actual).not.toBeNull()
    })
    it('should display the quantity of the order', function () {
        render(
            <BrowserRouter><OrderCard
                quantity={3}
            /></BrowserRouter>
        )
        let actual = screen.getByText(/Quantity: 3/)
        expect(actual).not.toBeNull()
    })
    it('should display the unit of the item', function () {
        render(
            <BrowserRouter><OrderCard
                nsn="5920014702312"
            /></BrowserRouter>
        )
        let actual = screen.getByText(/Unit: EA/)
        expect(actual).not.toBeNull()
    })
    it('should display the location of the item', function () {
        render(
            <BrowserRouter><OrderCard
                nsn="5920014702312"
            /></BrowserRouter>
        )
        let actual = screen.getByText(/Location: 01A004B001/)
        expect(actual).not.toBeNull()
    })
    it('should display if the task is open', function () {
        render(
            <BrowserRouter><OrderCard
                completed={false}
            /></BrowserRouter>
        )
        let actual = screen.getByTestId("task open")
        expect(actual).not.toBeNull()
    })
    it('should display if the task is closed', function () {
        render(
            <BrowserRouter><OrderCard
                completed={true}
            /></BrowserRouter>
        )
        let actual = screen.getByTestId("task complete")
        expect(actual).not.toBeNull()
    })
})

describe('<OrderCard> function', function() {
    it('should open the item scan dialog on click', function() {
        render(
            <BrowserRouter>
                <OrderCard 
                    name="doc1"
                    quantity={1}
                    nsn="5920014702312"
                />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Scan Items"})
        userEvent.click(button)
        let dialog = screen.getByRole("dialog")
        expect(dialog).not.toBeNull()
    })
})