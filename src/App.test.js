// testing help
import { render } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom"

// custom
import App from './App'

describe('<App>', function() {
    it('should render without error', function() {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )
    })
})