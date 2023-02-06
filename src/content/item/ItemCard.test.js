// testing help
import { render, screen } from '@testing-library/react'

// to test
import ItemCard from './ItemCard'

describe('<ItemCard>', function() {
    it('should display the item name', function() {
        render(
            <ItemCard
                name="Fuse, Cartridge"
            />
        )
        let actual = screen.queryByText("Fuse, Cartridge")
        expect(actual).not.toBeNull()
    })
    it('should display the NSN', function() {
        render(
            <ItemCard
                nsn="5920014702312"
            />
        )
        let actual = screen.queryByText("NSN: 5920014702312")
        expect(actual).not.toBeNull()
    })
    it('should display an image of the item', function() {
        render(
            <ItemCard
                img="./img/fuse.png"
                name="Fuse, Cartridge"
            />
        )
        let actual = screen.queryByAltText("Fuse, Cartridge")
        expect(actual).not.toBeNull()
    })
    it('should display the quanity in stock', function() {
        render(
            <ItemCard
                stock={3}
            />
        )
        let actual = screen.getByLabelText("Stock Count")
        expect(actual).not.toBeNull()
    })
})