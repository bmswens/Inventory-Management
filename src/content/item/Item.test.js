// testing help
import { render, screen } from '@testing-library/react'

// to test
import Item from './Item'

describe('<Item>', function() {
    it('should display the item name', function() {
        render(
            <Item
                name="Fuse, Cartridge"
            />
        )
        let actual = screen.queryByText("Fuse, Cartridge")
        expect(actual).not.toBeNull()
    })
    it('should display the NSN', function() {
        render(
            <Item
                nsn="5920014702312"
            />
        )
        let actual = screen.queryByText("NSN: 5920014702312")
        expect(actual).not.toBeNull()
    })
    it('should display an image of the item', function() {
        render(
            <Item
                img="./img/fuse.png"
                name="Fuse, Cartridge"
            />
        )
        let actual = screen.queryByAltText("Fuse, Cartridge")
        expect(actual).not.toBeNull()
    })
    it('should display the item location', function() {
        render(
            <Item
                location="01A004B001"
            />
        )
        let actual = screen.queryByText("Location: 01A004B001")
        expect(actual).not.toBeNull()
    })
    it('should display the cost per item', function() {
        render(
            <Item
                cost={1.03}
            />
        )
        let actual = screen.getByText("Unit Price: $1.03")
        expect(actual).not.toBeNull()
    })
    it('should display the quanity in stock', function() {
        render(
            <Item
                stock={3}
            />
        )
        let actual = screen.queryByText("In Stock: 3")
        expect(actual).not.toBeNull()
    })
    it('should display freestyle notes', function() {
        render(
            <Item
                notes={"3 units on backorder.\nEach item is a package of two."}
            />
        )
        let firstLine = screen.queryByText("3 units on backorder.")
        expect(firstLine).not.toBeNull()
        let secondLine = screen.queryByText("Each item is a package of two.")
        expect(secondLine).not.toBeNull()
    })
})