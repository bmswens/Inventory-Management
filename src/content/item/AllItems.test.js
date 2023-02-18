// testing help
import { render, screen} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// to test
import AllItems from './AllItems'
import api from '../../api'

describe('<AllItems>', function() {
    it('should display all items', function() {
        let spy = jest.spyOn(api.items, 'getAll')
        render(
            <BrowserRouter>
                <AllItems />
            </BrowserRouter>
        )
        expect(spy).toHaveBeenCalled()
    })
})