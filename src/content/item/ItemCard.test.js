// testing help
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// to test
import ItemCard from './ItemCard'

describe('<ItemCard>', function() {
    it('should display the item name', function() {
        render(
            <BrowserRouter>
                <ItemCard
                    name="Fuse, Cartridge"
                />
            </BrowserRouter>
        )
        let actual = screen.queryByText("Fuse, Cartridge")
        expect(actual).not.toBeNull()
    })
    it('should display the NSN', function() {
        render(
            <BrowserRouter>
            <ItemCard
                nsn="5920014702312"
            />
            </BrowserRouter>
        )
        let actual = screen.queryByText("NSN: 5920014702312")
        expect(actual).not.toBeNull()
    })
    it('should display the quanity in stock', function() {
        render(
            <BrowserRouter>
                <ItemCard
                    svcBal={3}
                />
            </BrowserRouter>
        )
        let actual = screen.getByLabelText("Stock Count")
        expect(actual).not.toBeNull()
    })
    it('should have an alt display for out of stock', function() {
        render(
            <BrowserRouter>
                <ItemCard
                    svcBal={0}
                />
            </BrowserRouter>
        )
        let actual = screen.getByText("0")
        expect(actual).not.toBeNull()
    })
})